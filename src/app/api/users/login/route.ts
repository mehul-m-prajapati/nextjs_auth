import { connect } from "@/dbConfig/dbConfig";
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import UserModel from "@/models/userModel"
import { NextResponse } from "next/server";

connect();

export async function POST(request: Request) {

    try {

        const reqBody = await request.json();
        const {email, password} = reqBody;

        //check if user exists
        const user = await UserModel.findOne({email});

        if (!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        const isValidPasswd = await bcryptjs.compare(password, user.password);

        if (!isValidPasswd) {
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const resp = NextResponse.json({
            message: "Login successful",
            success: true},
            {status: 200}
        );

        resp.cookies.set('token', token, {httpOnly: true});

        return resp;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
