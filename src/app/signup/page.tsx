'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {toast} from 'react-hot-toast'
import axios from "axios";


function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {

    if (!user.email || !user.password || !user.username) {
        toast.error('Please provide Email, Username and Password');
        return;
    }

    try {
        setLoading(true);

        const resp = await axios.post('/api/users/signup', user);

        toast.success('Signup success');
        router.push('/login');

    } catch (error: any) {
        console.log(error.message);
        toast.error(error.response.data.error);
    }
    finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />

        <label htmlFor="username">username</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4
            focus:outline-none focus:border-gray-600 text-white"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
        />

        <label htmlFor="email">email</label>
        <input
            className="p-2 border border-gray-300
             rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />

        <label htmlFor="password">password</label>
        <input
            className="p-2 border border-gray-300
             rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
        />

        <button
            onClick={onSignup}
            className="p-2 cursor-pointer hover:bg-gray-800 border border-gray-300 rounded-lg mb-4 focus:outline-none
             focus:border-gray-600">
            {buttonDisabled ? "No signup" : "Signup"}
        </button>

        <Link className="inline-block bg-blue-900 hover:bg-blue-800 text-white
        py-1 px-2 rounded" href="/login">Visit login page</Link>
    </div>
  )
}

export default SignupPage
