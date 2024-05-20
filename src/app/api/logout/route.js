import { NextResponse } from "next/server";

export async function POST(request) {
    // Create a JSON response with a logout message and success status
    const response = NextResponse.json({
        message: "Logged Out!",
        success: true
    });

    // Set the "authToken" cookie to an empty value and expire it immediately
    response.cookies.set("authToken", "", {
        httpOnly: true,
        expires: new Date(0) // Set to a past date to expire immediately
    });

    // Return the response after setting the cookies
    return response;
}
