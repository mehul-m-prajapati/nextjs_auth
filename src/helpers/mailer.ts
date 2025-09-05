import nodemailer from 'nodemailer';
import UserModel from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail = async( {email, emailType, userId }: any ) => {

    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {

            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        }
        else if (emailType === "RESET") {

            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            logger: true,
            debug: true,
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`,
        };

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    }
    catch (error:any) {
        throw new Error(error.message);
    }
}
