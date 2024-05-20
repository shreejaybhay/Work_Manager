"use client"

import React from 'react';

const Footer = () => {
    return (
        <footer className="text-gray-300 bg-gray-800 border-t-2 border-gray-700">
            <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full mb-8 md:w-1/3 lg:w-1/4">
                        <h3 className="mb-4 text-lg font-bold">About</h3>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut sodales lorem. Aliquam erat volutpat.</p>
                    </div>
                    <div className="w-full mb-8 md:w-1/3 lg:w-1/4">
                        <h3 className="mb-4 text-lg font-bold">Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm hover:text-white">Home</a></li>
                            <li><a href="#" className="text-sm hover:text-white">Add Task</a></li>
                            <li><a href="#" className="text-sm hover:text-white">Show Tasks</a></li>
                            <li><a href="#" className="text-sm hover:text-white">Login</a></li>
                            <li><a href="#" className="text-sm hover:text-white">Signup</a></li>
                        </ul>
                    </div>
                    <div className="w-full mb-8 md:w-1/3 lg:w-1/4">
                        <h3 className="mb-4 text-lg font-bold">Contact</h3>
                        <p className="text-sm">1234 Main St<br />New York, NY 10001<br />info@example.com</p>
                    </div>
                </div>
            </div>
            <div className="py-4 bg-gray-700">
                <div className="max-w-6xl px-4 mx-auto text-sm text-center sm:px-6 lg:px-8">
                    <p>&copy; {new Date().getFullYear()} Work Manager. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
