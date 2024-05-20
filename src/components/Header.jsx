"use client"
import React, { useState } from 'react';


const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }
    return (
        <div>
            <nav className="bg-gray-800 border-b-2 border-gray-700">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex justify-between">

                        <div className="flex space-x-4">

                            <div>
                                <a href="/" className="flex items-center px-2 py-5 text-gray-300 hover:text-gray-100">
                                    <svg className="w-6 h-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span className="font-bold text-white">Work Manager</span>
                                </a>
                            </div>


                            <div className="items-center hidden space-x-1 md:flex">
                                <a href="/" className="px-3 py-5 text-gray-300 hover:text-white">Home</a>
                                <a href="addtask" className="px-3 py-5 text-gray-300 hover:text-white">Add Task</a>
                                <a href="showtask" className="px-3 py-5 text-gray-300 hover:text-white">Show Tasks</a>
                                <a href="profile" className="px-3 py-5 text-gray-300 hover:text-white">Profile</a>
                            </div>
                        </div>


                        <div className="items-center hidden space-x-1 md:flex">
                            <a href="login" className="px-3 py-5 text-gray-300">Login</a>
                            <a href="signup" className="px-3 py-2 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800">SignUp</a>
                        </div>


                        <div className="flex items-center md:hidden">
                            <button onClick={toggleMobileMenu} className="mobile-menu-button">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>


                <div className={`mobile-menu ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden `}>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-300 border-t border-gray-600 hover:bg-gray-700">Home</a>
                    <a href="addtask" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Add Task</a>
                    <a href="showtask" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Show Tasks</a>
                    <a href="profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Profile</a>
                    <a href="login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Login</a>
                    <a href="signup" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Signup</a>
                </div>
            </nav>
        </div>
    )
}

export default Header;
