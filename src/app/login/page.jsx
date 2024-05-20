"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });


    const handleSubmit = async (e) => {

        e.preventDefault();
        let validationErrors = {};
        if (!email) {
            validationErrors.email = 'Please enter a valid email.';
        }
        if (!password) {
            validationErrors.password = 'Password is required.';
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok');
                }

                const result = await response.json();
                console.log(result);
                toast.success("Login successful.", { position: "top-center" });
                // Save the token or user data if needed
                router.push("/profile"); // Redirect to the profile page
            } catch (error) {
                console.error('Error:', error.message);
                toast.error("Error logging in. Please try again later.", { position: "top-center" });
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' }); // Clear the error message
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    };

    return (
        <div>
            <section className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-center text-white">Login</h2>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="w-full px-4 py-2 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800">Login</button>
                    </form>
                    <p className="mt-4 text-center text-gray-400">
                        Dont have an account? <a href="/signup" className="text-yellow-400 hover:underline">Sign up</a>
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Login;
