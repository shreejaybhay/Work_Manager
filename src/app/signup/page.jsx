"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { addUser } from '@/services/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [profileURL, setProfileURL] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', password: '', about: '', profileURL: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!name) {
            validationErrors.name = 'Name is required.';
        }
        if (!email) {
            validationErrors.email = 'Please enter a valid email.';
        }
        if (!password) {
            validationErrors.password = 'Password is required.';
        }
        if (!about) {
            validationErrors.about = 'About is required.';
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const result = await addUser({
                    name,
                    email,
                    password,
                    about,
                    profileURL
                });
                console.log(result);
                toast.success("User created successfully.", { position: "top-center" })
                setName("");
                setEmail("");
                setPassword("");
                setAbout("");
                setProfileURL("");
                router.push("/login");
            } catch (error) {
                console.log(error)
                toast.error("Error creating user. Please try again later.", { position: "top-center" });
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' }); // Clear the error message
        if (name === 'name') setName(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'about') setAbout(value);
        else if (name === 'profileURL') setProfileURL(value);
    };

    return (
        <div>
            <Head>
                <title>Signup : Work Manager</title>
            </Head>
            <section className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-center text-white">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="about" className="block text-gray-300">About</label>
                            <textarea
                                id="about"
                                name="about"
                                value={about}
                                onChange={handleInputChange}
                                className={`w-full h-32 px-3 py-2 mt-2 text-white bg-gray-800 rounded focus:outline-none focus:border-blue-500`}
                            ></textarea>
                            {errors.about && <p className="mt-1 text-sm text-red-500">{errors.about}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profileURL" className="block text-gray-300">Profile Image URL</label>
                            <input
                                type="text"
                                id="profileURL"
                                name="profileURL"
                                value={profileURL}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-300 bg-gray-800 rounded outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.profileURL && <span className="text-sm text-red-500">{errors.profileURL}</span>}
                        </div>
                        <button type="submit" className="w-full px-4 py-2 mt-4 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800">Signup</button>
                    </form>
                    <p className="mt-4 text-center text-gray-400">
                        Already have an account? <a href="/login" className="text-yellow-400 hover:underline">Login</a>
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Signup;
