import { NextResponse } from 'next/server';
import { User } from '@/models/users';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/helper/db';
// Define a function to handle GET requests
export async function GET(request) {
    connectDB()
    // Retrieve the authToken from the request cookies
    const authToken = request.cookies.get("authToken")?.value;

    // If no authToken is found, return an "Unauthorized" error
    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Verify the authToken using the JWT secret
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        // Find the user by their decoded ID
        const user = await User.findById(decoded._id).select("-password");

        // If the user is not found, return a "User not found" error
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If everything is successful, return the user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        // If an error occurs during token verification, return an "Invalid token" error
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
