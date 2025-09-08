import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const {token, password} = reqBody;

        const user = await UserModel.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({message: "Invalid token. Please try again"}, {status: 400});
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: 'Password updated successfully'}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
