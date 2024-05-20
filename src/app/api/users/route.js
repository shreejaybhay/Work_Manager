import { connectDB } from "@/helper/db";
import { User } from "@/models/users";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connecting to the database
connectDB();

// Default profile image URL
const DEFAULT_PROFILE_IMAGE_URL = "https://example.com/default-profile.png"; // Change this URL to your actual default image URL

// Post request function
export async function POST(request) {
    try {
        // Extracting user data from the request body
        const { name, email, password, about, profileURL } = await request.json();

        // Hashing the password
        const hashedPassword = await bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT));

        // Setting default profile URL if not provided
        const finalProfileURL = profileURL || DEFAULT_PROFILE_IMAGE_URL;

        // Creating a new user instance with the extracted data
        const user = new User({ name, email, password: hashedPassword, about, profileURL: finalProfileURL });

        // Saving the new user to the database
        const createdUser = await user.save();

        // Customizing the response body with relevant user data
        const responseData = {
            id: createdUser._id, // Assuming MongoDB generates the ID
            name: createdUser.name,
            email: createdUser.email,
            about: createdUser.about,
            profileURL: createdUser.profileURL
        };

        // Creating a JSON response with the custom data and status 201 (Created)
        const response = NextResponse.json(responseData, { status: 201 });

        // Returning the response
        return response;
    } catch (error) {
        // If an error occurs during user creation or saving
        console.error("Error creating user:", error);

        // Handling the error by returning a 500 Internal Server Error response
        const errorResponse = NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

        // Returning the error response
        return errorResponse;
    }
}

// Get request function
export async function GET(request) {
    let users = [];
    try {
        // Fetching all users from the database
        users = await User.find();
    } catch (error) {
        // Logging the error to the console for debugging
        console.error(error);
        // Returning a 500 Internal Server Error response with an error message
        return NextResponse.json({ message: "Error retrieving data" }, { status: 500 });
    }
    // Returning the fetched users as a JSON response
    return NextResponse.json(users, { status: 200 }); // Adding a 200 OK status explicitly
}
