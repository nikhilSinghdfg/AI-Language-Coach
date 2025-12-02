import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: "Refresh token not found" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const decodedData = {
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username
        }

        const newAccessToken = jwt.sign(
            decodedData,   // keep minimal data
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        const res = NextResponse.json({
            success: true,
            message: "Access token refreshed"
        });

        res.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/"
        });

        return res; // 🔥🔥 THIS WAS MISSING 🔥🔥

    } catch (error) {
        return NextResponse.json(
            { error: "Invalid or expired refresh token" },
            { status: 401 }
        );
    }
}
