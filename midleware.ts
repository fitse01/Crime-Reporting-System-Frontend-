

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
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const role = request.cookies.get('userRole')?.value;
    const path = request.nextUrl.pathname;

    console.log(`Middleware Check - Path: ${path} | Role: ${role}`);

    // Define dashboard paths per role
    const getDashboardPath = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN': return '/admin/dashboard';
            case 'ADMIN': return '/admin/dashboard';
            case 'OPERATOR': return '/operator/dashboard'; // Assuming you will create this if not exists or map it
            case 'OFFICER': return '/officer/dashboard';
            default: return '/officer/login';
        }
    };

    // 1. If trying to access Login while ALREADY logged in
    if (path === '/officer/login' && role) {
        return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
    }

    // 2. Auth Guard
    if (path.startsWith('/officer') && path !== '/officer/login') {
        if (!role) {
            return NextResponse.redirect(new URL('/officer/login', request.url));
        }

        // Strict Role Separation
        // If I am an Operator, I should not be in /officer/* unless it is shared. 
        // Assuming /officer/* is for OFFICERS and /operator/* is for OPERATORS.
        // But current project structure might have everything under /officer. 
        // Let's implement the redirect requested: "when I create a new officer giving him a roll of operator I want it to act as and access operator UI"

        if (role === 'OPERATOR') {
            // If Operator tries to access standard officer dashboard, redirect to operator dashboard
            // You need to ensure /operator/dashboard route exists or is created.
            // For now, let's assume /operator/* path or a specific operator page.
            // If the user hasn't built /operator yet, we might loop. 
            // **CRITICAL**: The user prompt asks to "Upgrade Operator Dashboard". 
            // I will assume for now that Operator Dashboard will live at `/operator/dashboard` or similar.
            // If the current URL is NOT starting with /operator, redirect.

            // Wait, if the middleware only matches /officer/:path*, it won't trigger for /operator.
            // So I need to redirect FROM /officer TO /operator if role is OPERATOR.
            return NextResponse.redirect(new URL('/operator/dashboard', request.url));
        }

        if (role === 'OFFICER' && path.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
        }
    }

    // Add logic for /operator protection if I add it to matcher
    if (path.startsWith('/operator')) {
        if (!role) return NextResponse.redirect(new URL('/officer/login', request.url));
        if (role !== 'OPERATOR' && role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
        }
    }

    // Add logic for /admin protection if I add it to matcher
    if (path.startsWith('/admin')) {
        if (!role) return NextResponse.redirect(new URL('/officer/login', request.url));
        if (role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/officer/unauthorized', request.url));
        }
    }


    return NextResponse.next();
}

export const config = {
    matcher: ['/officer/:path*', '/operator/:path*', '/admin/:path*'],
};