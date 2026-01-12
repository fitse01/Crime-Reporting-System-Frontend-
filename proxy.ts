// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/request'

// // Define which roles can access which paths
// const rolePaths = {
//     SUPER_ADMIN: ['/officer/ai-analysis', '/officer/officers'],
//     ADMIN: ['/officer/officers', '/officer/reports'],
//     OPERATOR: ['/officer/reports'],
//     OFFICER: ['/officer/dashboard', '/officer/cases']
// }

// export function middleware(request: NextRequest) {
//     // 1. Get user role from cookie (assuming you set one during login)
//     const role = request.cookies.get('userRole')?.value;
//     const path = request.nextUrl.pathname;

//     // 2. If trying to access AI Analysis and not Super Admin
//     if (path.startsWith('/officer/ai-analysis') && role !== 'SUPER_ADMIN') {
//         return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/officer/:path*'],
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' // Corrected import

export function proxy(request: NextRequest) {
    // 1. Get user role from cookie
    const role = request.cookies.get('userRole')?.value;
    const path = request.nextUrl.pathname;

    console.log(`Middleware Check - Path: ${path} | Role: ${role}`);

    // 2. Protect AI Analysis
    if (path.startsWith('/officer/ai-analysis')) {
        // If not logged in at all
        if (!role) {
            return NextResponse.redirect(new URL('/officer/login', request.url));
        }

        // If logged in but NOT a Super Admin
        if (role !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/officer/:path*'],
};