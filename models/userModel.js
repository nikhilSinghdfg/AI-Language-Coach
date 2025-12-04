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
    unique: true, // make email unique
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isVerify: {
    type: Boolean,
    default: false, // verification initially false
  },
  verifyToken: String,
  verifyTokenExpiry: Date,

});

UserSchema.index({email:1},{unique:true})


export const User = mongoose.models.users || mongoose.model("users", UserSchema)