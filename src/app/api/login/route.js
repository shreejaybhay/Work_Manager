import { User } from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";

export async function POST(request) {
    await connectDB();  // Ensure database connection

    try {
        // Extract email and password from the request body
        const { email, password } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });

        // If the user is not found, return an error response
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Compare the provided password with the hashed password
        const matched = await bcrypt.compare(password, user.password);

        // If the password does not match, return an error response
        if (!matched) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { _id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Create the response object and set the cookie
        const response = NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            { status: 200 }
        );

        response.headers.set(
            "Set-Cookie",
            `authToken=${token}; Path=/; HttpOnly; Max-Age=86400;${process.env.NODE_ENV === "production" ? " Secure;" : ""}`
        );

        // Return the response with the cookie
        return response;
    } catch (error) {
        console.error("Login error:", error);
        // If an error occurs, return an error response
        return NextResponse.json(
            { message: "Server error: " + error.message },
            { status: 500 }
        );
    }
}
