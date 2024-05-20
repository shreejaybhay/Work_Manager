import { User } from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { userId } = params; // Extracting userId from the parameters

    try {
        // Attempting to find the user with the given userId in the database
        const user = await User.findOne({ _id: userId });

        if (!user) {
            // If no user is found, return a 404 Not Found response
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Returning the found user as a JSON response
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error retrieving user:", error); // Logging the error for debugging

        // Returning an error response if the query fails
        return NextResponse.json({ message: "Error retrieving user" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    console.log(params); // Logging the parameters for debugging
    const { userId } = params; // Extracting the userId from the parameters

    try {
        // Attempting to delete the user with the given userId from the database
        await User.deleteOne({ _id: userId });

        // Returning a success response if deletion is successful
        return NextResponse.json({ message: "User deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error); // Logging the error for debugging

        // Returning an error response if deletion fails
        return NextResponse.json({ message: "Error deleting user", success: false }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    console.log(params);
    const { userId } = params; // Extracting the userId from the parameters
    const { name, password, about, profileURL } = await request.json(); // Extracting the new user data from the request body

    try {
        // Finding the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Updating the user with new data
        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;

        // Saving the updated user
        const updatedUser = await user.save();

        // Returning the updated user as a JSON response
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error); // Logging the error for debugging

        // Returning an error response if the update fails
        return NextResponse.json({ message: "Error updating user" }, { status: 500 });
    }
}