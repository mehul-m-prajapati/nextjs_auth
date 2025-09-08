'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function resetPassword() {
  const [token, setToken] = useState("");
  const [newPasswd, setNewPasswd] = useState('');
  const router = useRouter();

  const resetPasswd = async () => {

    if (token.length > 0) {
        try {
            const resp = await axios.post('/api/users/resetPasswd', {token, password: newPasswd});

            toast.success(resp.data.message);
            router.push('/login');
        }
        catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    else {
        toast.error('No token found in URL');
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className="text-3xl">Forget Password</h1>

        <h2 className="p-2 bg-gray-800 text-white">
            Token: {token ? `${token}` : "no token"}
        </h2>

        <label htmlFor="password">New password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
         focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={newPasswd}
            onChange={(e) => setNewPasswd(e.target.value)}
            placeholder="password"
        >
        </input>

        <button onClick={resetPasswd} className="p-2 border border-gray-300
         rounded-lg mb-4 cursor-pointer hover:bg-gray-800 focus:outline-none focus:border-gray-600">
            Submit
        </button>
    </div>
  )
}

export default resetPassword
