import { NextResponse } from 'next/server';
import { connectDB } from './helper/db';

export async function middleware(request) {
    console.log("Middleware executed");
    const dbConnection = await connectDB();
    const authToken = request.cookies.get("authToken")?.value;
    const { pathname } = request.nextUrl;

    const isPublicRoute = ["/login", "/signup"].includes(pathname);
    const isProtectedRoute = ["/addtask", "/showtask", "/profile"].includes(pathname);

    if (isPublicRoute && authToken) {
        // Authenticated users should not access login or signup pages
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    if (isProtectedRoute && !authToken) {
        // Unauthenticated users should not access protected routes
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/addtask",
        "/showtask",
        "/profile",
    ],
};
