import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    try {

        const resp = NextResponse.json({message: 'Logout successful'});

        resp.cookies.set('token', '', {
            httpOnly: true, expires: new Date(0)
        });

        return resp;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
