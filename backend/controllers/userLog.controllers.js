import UserModel from "../models/user.model.js";
import AppError from "../utils/error/app-error.util.js";
import encryptPassword from "../utils/pass-encryption.utils.js";

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    const user = await UserModel.find({ username });
    if (!user.length ||
        encryptPassword(password).toString('hex') !== user[0].password.toString('hex')
    )
        throw new AppError("Incorrect Username or Password!", 400);

    req.session.regenerate(err => {
        if (err)
            throw new AppError("Unable to Create Session", 500);
        console.dir(user[0]._id.toString())
        req.session.user = {
            id: user[0]._id.toString(),
            isAdmin: user[0].isAdmin ? true : false
        }
        res.status(200).json({
            success: true,
            user: {
                id: user[0]._id.toString(),
                isAdmin: user[0].isAdmin ? true : false
            }
        })
    })
}

const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({ success: true });
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!req.session.user)
        throw new AppError("User not logged in!", 400);
    const user = await UserModel.findById(req.session.user.id);
    console.log(user);
    if (!user)
        throw new AppError("User doesn't exist!", 404);
    if (encryptPassword(oldPassword).toString('hex') !== user.password.toString('hex'))
        throw new AppError("Incorrect Old Password!", 400)
    await UserModel.findByIdAndUpdate(user._id, {
        password: encryptPassword(newPassword)
    });
    req.session.destroy();
    res.status(200).json({ success: true });
}

const getLoggedInUser = async (req, res) => {
    if (!req.session.user)
        return res.status(401).json({ success: false });
    res.status(200).json({
        success: true,
        user: req.session.user
    });
}

const UserLogControllers = {
    login,
    logout,
    changePassword,
    getLoggedInUser
}

export default UserLogControllers;