import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await UserModel.findOne({email});

        if (!user) {
            return NextResponse.json({message: 'No user found with given email id'}, {status: 400});
        }

        const emailResp = await sendEmail({email, emailType: 'RESET', userId: ''});

        return NextResponse.json({message: "Reset password email sent"}, {status: 200});
    }
    catch (error: any) {
          return NextResponse.json({error: error.message}, {status: 500});
    }

}
