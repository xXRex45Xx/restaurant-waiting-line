import UserModel from "../models/user.model.js";
import encryptPassword from "../utils/pass-encryption.utils.js";

const GetAllUsers = async (req, res, next) => {
    const {q} = req.query;
    const users = await UserModel.find(q ? {name: new RegExp(q)} : null).select({password: 0});
    res.status(200).json(users);
}

const AddUser = async (req, res, next) => {
    const {user} = req.body;
    user.password = encryptPassword(user.password);
    const newUser = await UserModel(user);
    await newUser.save();
    res.status(200).json({success: true, insertedUser: newUser._id});
}

const GetSpecificUser = async (req, res, next) => {
    const {userId} = req.params;
    const user = await UserModel.findById(userId).select({password: 0});
    res.status(200).json(user);
}

const UpdateUser = async (req, res, next) => {
    const {userId} = req.params;
    const {user} = req.body;
    const updatedId = await UserModel.findByIdAndUpdate(userId, 
        {
            name: user.name, 
            phoneNumber: user.phonenumber
        }, {runValidators: true});
    res.status(200).json({success: true, userId: updatedId._id});
}

const DeleteUser = async (req, res, next) => {
    const {userId} = req.params;
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({success: true});
}

const userControllers = {
    GetAllUsers,
    AddUser,
    GetSpecificUser,
    UpdateUser,
    DeleteUser
}

export default userControllers;