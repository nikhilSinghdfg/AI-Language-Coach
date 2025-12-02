import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../../models/userModel";

export async function DELETE(req) {
    try {

        const accessToken = req.cookies.get("accessToken")?.value
        if (!accessToken) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        await User.findByIdAndDelete(decoded._id)

        const res = NextResponse.json({ success: true, message: "Account is Deleted" })
        res.cookies.set("accessToken", "", { maxAge: 0, path: "/" })
        res.cookies.set("refreshToken", "", { maxAge: 0, path: "/" })

        return res;
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}

export async function GET(req) {
    try {
        const accessToken = req.cookies.get("accessToken")?.value;

        if (!accessToken) {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }

       let decoded;
           try {
             decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
           } catch (error) {
             return NextResponse.json(
               { success: false, message: "Invalid or expired token" },
               { status: 401 }
             );
           }

        const userdata = await User.findById(decoded._id).select("-password")




        const responseData = {
            isAuthenticated: true,
            user: {
                email: userdata?.email,
                username: userdata?.username,
                isVerify: userdata?.isVerify,
                isAdmin: userdata?.isAdmin
            }
        };

        console.log("profile data is:", responseData.user); // 🔥 Correct logging

        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}