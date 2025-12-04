import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DBconnect } from "../../../../utils/dbConfig";
import { cookies } from "next/headers";


DBconnect()

export async function GET(req) {
  try {
   const accessToken = req.cookies.get("accessToken")?.value;

  // const cookieStore = cookies();
   // const accessToken = cookieStore.get("accessToken")?.value;


    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No access token" },
        { status: 401 }
      );
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

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: decoded._id,
          username: decoded.username,
          email: decoded.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
