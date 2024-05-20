"use client"
import Image from "next/image";


export default function Home() {



    return (
        <section className="flex items-center justify-center h-screen py-20 pb-32 text-white bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-bold">Welcome to Work Manager</h1>
                    <p className="mb-6 text-lg">
                        Streamline your workflow and manage tasks efficiently with our powerful tools.
                    </p>
                    <a href="/signup" className="px-6 py-3 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800">
                        Get Started
                    </a>
                </div>
            </div>
        </section>
    );
}
