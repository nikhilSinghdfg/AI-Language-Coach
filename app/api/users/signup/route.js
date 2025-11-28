import { DBconnect } from "../../../../utils/dbConfig";
import { User } from "../../../../models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";


DBconnect()
export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user =await User.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: "User already exist",
                status: 400
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);


        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })



    } catch (error) {
        return NextResponse.json({
            message: error.message,
            status: 500
        })
    }
}