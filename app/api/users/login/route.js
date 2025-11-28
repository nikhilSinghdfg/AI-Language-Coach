import { DBconnect } from "../../../../utils/dbConfig";
import { User } from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";


DBconnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);



        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json(
                {
                    message: "user not exist",
                },
                {
                    status: 400
                }
            )
        }
        console.log('user exist');

        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        /*
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        */

        const accessToken = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
        const refreshToken = await jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "15d" })


        const response = NextResponse.json(
            {
                message: "Login successful",
                success: true,
                user: {
                    email: user.email,
                    username: user.username,
                },
            },
            {
                status: 200
            }
        )

        /*
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        })

*/

        response.cookies.set("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 }); // 15 mins
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 15 }); // 7 days


        console.log(response, "logged in user");

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}