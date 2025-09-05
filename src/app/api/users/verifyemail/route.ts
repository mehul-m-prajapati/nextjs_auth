import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        const {token} = reqBody;

        const user = await UserModel.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({message: "Invalid token"}, {status: 400});
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
        }, {status: 200});
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
