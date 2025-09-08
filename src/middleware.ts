

import { NextRequest, NextResponse } from 'next/server'


function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',              // Home page
        '/profile',       // Protected
        '/login',         // Public
        '/signup',        // Public
        '/verifyemail'    // Public
    ]
}

export default middleware
