/*

import { DBconnect } from "../../../../utils/dbConfig";
import { User } from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
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





        response.cookies.set("accessToken", accessToken, { httpOnly: true, secure: isProd, maxAge: 60 * 60 * 24 });
        response.cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: isProd, maxAge: 60 * 60 * 24 * 15 });


        console.log(response, "logged in user");

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}

*/

// File: /app/api/auth/login/route.js
import { DBconnect } from "../../../../utils/dbConfig";
import { User } from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

DBconnect();

export async function POST(req) {
  try {
    // 1️⃣ Parse request body safely
    const reqBody = await req.json().catch(() => ({}));
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 3️⃣ Compare password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 4️⃣ Prepare token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // 5️⃣ Create tokens
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15d",
    });

    // 6️⃣ Prepare response
    const response = NextResponse.json({
      message: "Login successful",
      user: { email: user.email, username: user.username },
    });

    // 7️⃣ Set HttpOnly cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15, // 15 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
