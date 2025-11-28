import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,

    },
    isVerify: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: Date,
    verifyTokenExpiry: Date,



})

export const User = mongoose.models.users || mongoose.model("users", UserSchema)