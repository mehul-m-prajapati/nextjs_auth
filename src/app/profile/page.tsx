'use client'

import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

function ProfilePage() {

  const [data, setData] = useState("nothing");
  const [profile, setProfile] = useState({username: '', email: ''});

  const router = useRouter();

  const logout = async () => {
    try {
        await axios.get('/api/users/logout');
        toast.success('Logout successful');
        router.push('/login');
    }
    catch (error: any) {
        console.log(error.message);
        toast.error(error.message)
    }
  }

  const getUserDetails = async () => {

    try {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
        setProfile(res.data.data);
    }
    catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-xl">Profile</h1>
        <hr className=""></hr>
        <h2 className="p-1 my-4 rounded bg-yellow-800">
            {data === 'nothing' ? "Nothing" :
                <Link href={`/profile/${data}`}>
                    {data}
                </Link>}
        </h2>
        <p><span className="font-bold italic p-1">Username:</span> {profile?.username}</p>
        <p className="mt-2"><span className="font-bold italic p-1">Email:</span> {profile?.email}</p>

        <hr />
        <button
            onClick={logout}
            className="bg-blue-800 mt-6 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
        </button>

        <button onClick={getUserDetails}
        className="bg-green-800 mt-4 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                GetUser Details
        </button>

    </div>
  )
}

export default ProfilePage
