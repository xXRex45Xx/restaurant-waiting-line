import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    phoneNumber: {
        type: String,
        minlength: 0,
        maxlength: 14,
        required: true
    },
    username: {
        type: String,
        maxlength: 50,
        required: true
    },
    password: {
        type: Buffer,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const UserModel = mongoose.model('User', userSchema);

export default UserModel;