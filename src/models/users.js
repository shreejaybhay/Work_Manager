import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: String,
    profileURL: String,
}, { timestamps: true })

export const User = mongoose.models.users || mongoose.model("users", userSchema)
