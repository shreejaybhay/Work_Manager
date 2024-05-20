'use client'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addTask } from '@/services/taskService';
import { useRouter } from 'next/navigation';

const AddTask = () => {
    const router = useRouter();
    useEffect(() => {
        document.title = 'Add Task : Work Manager'; // Update document title
    }, []);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const userId = ""; // Assuming you will set the userId appropriately
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Title is required.";
        if (!content) newErrors.content = "Content is required.";
        if (!status) newErrors.status = "Status is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                console.log("Submitting task with status:", status); // Debug log
                const result = await addTask({
                    title,
                    content,
                    status,
                    userId
                });
                console.log(result);
                toast.success("Task added successfully!", { position: "top-center" });
                setTitle("");
                setContent("");
                setStatus("");
                setErrors({});
                router.push("/showtask")
            } catch (error) {
                console.error("Error adding task:", error); // Improved error logging
                toast.error("Error adding task!");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' }); // Clear error message on input change

        if (name === 'title') setTitle(value);
        else if (name === 'content') setContent(value);
        else if (name === 'status') setStatus(value);
    };

    return (
        <section className="min-h-screen py-12 bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-white">Add New Task</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-300">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 mt-2 text-white bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-600'} rounded focus:outline-none focus:border-blue-500`}
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-lg font-medium text-gray-300">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                value={content}
                                onChange={handleChange}
                                className={`w-full h-32 px-3 py-2 mt-2 text-white bg-gray-800 border ${errors.content ? 'border-red-500' : 'border-gray-600'} rounded focus:outline-none focus:border-blue-500`}
                            ></textarea>
                            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-lg font-medium text-gray-300">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 mt-2 text-white bg-gray-800 border ${errors.status ? 'border-red-500' : 'border-gray-600'} rounded focus:outline-none focus:border-blue-500`}
                            >
                                <option value="">--- Select Status ---</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddTask;
