import { getResponseMessage } from "@/helper/errorMessage";
import Task from "@/models/task"; // Importing the Task model
import { NextResponse } from "next/server"; // Importing Next.js response utility
import jwt from "jsonwebtoken"; // Import jwt for token verification

// Get all the tasks
export async function GET(request) {
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting data", false, 404);
    }
}

// Create a task
export async function POST(request) {
    try {
        const { title, content } = await request.json(); // Extracting data from the request body

        // Fetching logged in user id from the auth token
        const authToken = request.cookies.get("authToken")?.value;
        if (!authToken) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        console.log(decoded._id);

        // Creating a new task instance with the extracted data
        const task = new Task({ title, content, userId: decoded._id });

        // Saving the new task to the database
        const createdTask = await task.save();

        // Returning the created task as a JSON response with status 201 (Created)
        return NextResponse.json(createdTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error); // Logging the error for debugging

        // Returning an error response with status 500 (Internal Server Error)
        return NextResponse.json({ message: "Error creating task", error: error.message }, { status: 500 });
    }
}
