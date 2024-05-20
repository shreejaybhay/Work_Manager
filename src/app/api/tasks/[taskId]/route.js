import { getResponseMessage } from "@/helper/errorMessage";
import Task from "@/models/task";
import { NextResponse } from "next/server";

//get single tasks
export async function GET(request, { params }) {
    const { taskId } = params;

    try {
        const task = await Task.findById(taskId)

        if (!task) {
            return getResponseMessage("Task not found", 404, false);
        }

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        console.error("Error in getting task:", error);
        return getResponseMessage("Error in getting task !!", 500, false);
    }
}


export async function PUT(request, { params }) {
    try {
        const { taskId } = params;
        const { title, content, status } = await request.json();

        let task = await Task.findById(taskId);

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        task.title = title;
        task.content = content;
        task.status = status;

        const updatedTask = await task.save();

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error in updating task:", error);
        return NextResponse.json({ message: "Error in updating task" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {

    try {
        const { taskId } = params;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error in deleting task:", error);
        return NextResponse.json({ message: "Error in deleting task" }, { status: 500 });
    }
}