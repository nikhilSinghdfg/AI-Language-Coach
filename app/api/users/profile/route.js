import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../../models/userModel";
import { DBconnect } from "../../../../utils/dbConfig";
import { cookies } from "next/headers";

DBconnect()


export async function GET(req) {
    try {
       // const cookieStore = cookies();
// const accessToken = cookieStore.get("accessToken")?.value;

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