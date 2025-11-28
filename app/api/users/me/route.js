import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: decoded._id,
        username: decoded.username,
        email: decoded.email,
      }
    });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
