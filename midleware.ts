

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server' // Corrected import

// export function proxy(request: NextRequest) {
//     // 1. Get user role from cookie
//     const role = request.cookies.get('userRole')?.value;
//     const path = request.nextUrl.pathname;

//     console.log(`Middleware Check - Path: ${path} | Role: ${role}`);

//     // 2. Protect AI Analysis
//     if (path.startsWith('/officer/ai-analysis')) {
//         // If not logged in at all
//         if (!role) {
//             return NextResponse.redirect(new URL('/officer/login', request.url));
//         }

//         // If logged in but NOT a Super Admin
//         if (role !== 'SUPER_ADMIN') {
//             return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
//         }
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/officer/:path*'],
// };

// middleware.ts (Ensure the filename is exactly this)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const role = request.cookies.get('userRole')?.value;
    const path = request.nextUrl.pathname;

    console.log(`Middleware Check - Path: ${path} | Role: ${role}`);

    // 1. If trying to access Login while ALREADY logged in, 
    // redirect to dashboard to prevent loops
    if (path === '/officer/login' && role) {
        return NextResponse.redirect(new URL('/officer/dashboard', request.url));
    }

    // 2. Allow SUPER_ADMIN to go anywhere else immediately
    if (role === 'SUPER_ADMIN') {
        return NextResponse.next();
    }

    // 3. Protect AI Analysis for everyone else
    if (path.startsWith('/officer/ai-analysis')) {
        if (!role) {
            return NextResponse.redirect(new URL('/officer/login', request.url));
        }
        if (role !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
        }
    }

    // 4. General Auth Guard: If no role and trying to access any officer page (except login)
    if (!role && path !== '/officer/login') {
        return NextResponse.redirect(new URL('/officer/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/officer/:path*'],
};