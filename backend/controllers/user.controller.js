import UserModel from "../models/user.model.js";

const GetAllUsers = async (req, res, next) => {
    const {q} = req.query;
    const users = await UserModel.find(q ? {name: new RegExp(q)} : null);
    res.status(200).json(users);
}

const userControllers = {
    GetAllUsers
}

export default userControllers;