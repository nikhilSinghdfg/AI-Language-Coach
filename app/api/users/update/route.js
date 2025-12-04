import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { User } from "../../../../models/userModel";
import { DBconnect } from "../../../../utils/dbConfig";
import bcryptjs from "bcryptjs";

DBconnect();

export async function PATCH(req) {
    try {
        // 1️⃣ Get token
        const accessToken = req.cookies.get("accessToken")?.value;
        if (!accessToken) {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
        }

        // 2️⃣ Get data from frontend
        const body = await req.json();
        const { username, email, password } = body;

        const updatedData = {};
        if (username) updatedData.username = username;
        if (email) updatedData.email = email;
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            updatedData.password = await bcryptjs.hash(password, salt);
        }

        if (Object.keys(updatedData).length === 0) {
            return NextResponse.json({ message: "No valid fields provided" }, { status: 400 });
        }

       

        // Check for duplicate email
        if (email) {
            const existingEmail = await User.findOne({ email, _id: { $ne: decoded._id } });
            if (existingEmail) {
                return NextResponse.json(
                    { success: false, message: "Email already in use" },
                    { status: 400 }
                );
            }
        }



        // 3️⃣ Update user in DB
        const updatedUser = await User.findByIdAndUpdate(
            decoded._id,
            updatedData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }


         const tokenData = {
              _id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
            };
        
            // 5️⃣ Create tokens
            const newaccessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: "1d",
            });
            const newrefreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
              expiresIn: "15d",
            });

        // 4️⃣ Return updated user
        const res= NextResponse.json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        }, { status: 200 });


         res.cookies.set("accessToken", newaccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.cookies.set("refreshToken", newrefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15, // 15 days
      path: "/",
    });


        return res;
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
