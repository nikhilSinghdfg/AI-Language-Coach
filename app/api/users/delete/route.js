import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../../models/userModel";
import { DBconnect } from "../../../../utils/dbConfig";

DBconnect()


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

