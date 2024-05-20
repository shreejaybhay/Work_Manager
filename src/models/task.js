import mongoose, { Schema } from "mongoose";

const TaskSchrms = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchrms)
export default Task;