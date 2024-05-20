"use client";
import React, { Suspense, useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import { logout } from '@/services/userService';
import { toast } from 'react-toastify';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/me');
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
                router.push('/login'); // Redirect to login if there's an error
            }
        };
        fetchUserData();
    }, [router]);


    

    async function doLogout() {

        try {
            const result = await logout()
            console.log(result);
            router.push('/login')
            toast.success('Logout successful',)
        } catch (error) {
            console.log(error);
        }
    }

    if (!user) return <Loading />;
    return (
        <div>
            <Head>
                <title>Profile : Work Manager</title>
            </Head>
            <section className="flex items-center justify-center min-h-screen bg-gray-800">

                <div className="w-full max-w-md p-8 bg-gray-700 rounded-lg shadow-lg">
                    <h2 className="mb-6 text-3xl font-bold text-center text-white">User Profile</h2>
                    <div className="mb-4">
                        <img src={user.profileURL || '/default-profile.png'} alt="Profile Picture" className="object-cover w-32 h-32 mx-auto mb-4 rounded-full" />
                        <h3 className="text-2xl text-center text-white">{user.name}</h3>
                        <p className="text-center text-gray-400">{user.email}</p>
                        <p className="mt-4 text-center text-gray-300">{user.about}</p>
                    </div>
                    <button
                        onClick={() => router.push('/editprofile')}
                        className="w-full px-4 py-2 mt-4 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800"
                    >
                        Edit Profile
                    </button>
                    <button onClick={doLogout}
                        className="w-full px-4 py-2 mt-4 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800"
                    >
                        Logout
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Profile;
