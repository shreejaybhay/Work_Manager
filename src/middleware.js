import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware executed");

    const authToken = request.cookies.get("authToken")?.value;

    const loggedInUserNotAccessPaths =
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname == "/signup" ||
        request.nextUrl.pathname === "/api/users" ||
        request.nextUrl.pathname === "/api/login";

    if (loggedInUserNotAccessPaths) {
        // access not secured route
        if (authToken) {
            return NextResponse.redirect(new URL("/profile", request.url));
        }
    } else {
        // accessing secured route

        if (!authToken) {
            if (request.nextUrl.pathname.startsWith("/api")) {
                return NextResponse.json(
                    {
                        message: "Access Denied !!",
                        success: false,
                    },
                    {
                        status: 401,
                    }
                );
            }

            return NextResponse.redirect(new URL("/login", request.url));
        } else {
            // varify...
        }
    }

    console.log(authToken);

    //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/login",
        "/signup",
        "/addtask",
        "/showtask",
        "/profile",
        "/api/:path*",
    ],
};