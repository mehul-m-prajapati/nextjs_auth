import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: Request) {

    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        //check username, email
        const existingUser = await UserModel.findOne({
            $or: [
                {username}, {email}
            ]
        });

        if (existingUser) {
            return NextResponse.json({message: 'Username or email already in use'}, {status: 400});
        }
        
        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json({message: 'User created successfully"'}, {status: 200});
    }
    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
