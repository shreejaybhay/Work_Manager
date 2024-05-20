"use client"
import axios from 'axios';
import { deleteTask, getTasksOfUser } from '@/services/taskService';
import React, { useEffect, useState } from 'react';
import LoadingSkeleton from './loading';
import Link from 'next/link';


const ShowTasks = () => {
    const [userId, setUserId] = useState('');
    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/me');
                const userId = response.data.user._id;
                setUserId(userId);

                const tasks = await getTasksOfUser(userId);
                setUserTasks(tasks);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            const updatedTasks = userTasks.filter(task => task._id !== taskId);
            setUserTasks(updatedTasks);
        } catch (error) {
            console.log(error);
        }
    };




    if (!userTasks || userTasks.length === 0) {
        return <LoadingSkeleton />;
    }
    return (
        <section className="min-h-screen py-12 bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-white">Tasks List</h2>
                    <div className="space-y-6">
                        {userTasks.map(task => (
                            <div key={task.id} className="p-6 bg-gray-800 rounded-lg shadow-md">
                                <h3 className="mb-2 text-lg font-semibold text-blue-400">{task.title}</h3>
                                <p className="mb-4 text-gray-300">{task.content}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className={`px-2 py-1 text-sm rounded ${task.status === 'Pending' ? 'bg-yellow-400 text-yellow-900' : 'bg-green-400 text-green-900'}`}>{task.status}</span>
                                    </div>
                                    <div>
                                        <Link href={`/edittopic/${task._id}`} className="px-4 py-2 mr-2 text-sm font-semibold transition duration-300 bg-blue-400 rounded hover:bg-blue-300 hover:text-blue-800">Edit</Link>
                                        <button onClick={() => handleDelete(task._id)} className="px-4 py-2 text-sm font-semibold transition duration-300 bg-red-400 rounded hover:bg-red-300 hover:text-red-800">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShowTasks;
