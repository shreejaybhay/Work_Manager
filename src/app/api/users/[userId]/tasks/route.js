//localhost:300/api/users/[userId]/tasks
import Task from "@/models/task";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { userId } = params;

    try {

        const task = await Task.find({
            userId: userId
        });
        return NextResponse.json(task)

    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}