import React from 'react';

const LoadingSkeleton = () => {
    return (
        <section className="min-h-screen py-12 bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-white">Tasks List</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map(index => (
                            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
                                <div className="w-3/4 h-6 mb-2 bg-gray-600 rounded"></div>
                                <div className="w-full h-16 mb-4 bg-gray-600 rounded"></div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="w-12 h-4 px-2 py-1 bg-gray-600 rounded"></div>
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 mr-4 text-sm font-semibold transition duration-300 bg-gray-600 rounded hover:bg-gray-500 hover:text-white" disabled>Loading</button>
                                        <button className="px-4 py-2 text-sm font-semibold transition duration-300 bg-gray-600 rounded hover:bg-gray-500 hover:text-white" disabled>Loading</button>
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

export default LoadingSkeleton;
