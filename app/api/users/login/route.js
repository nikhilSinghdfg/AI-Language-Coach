

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
      return NextResponse.json(
        { success: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // 3️⃣ Compare password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
     return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 400 }
      );
    }

    // 4️⃣ Prepare token payload
    const tokenData = {
      _id: user._id,
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
