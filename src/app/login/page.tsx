'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";


function LoginPage() {

  const router = useRouter();
  const [user, setUser] = useState({
        email: "",
        password: "",
  });
  const [loading, setLoading] = useState(false);

  const sendResetPasswdEmail = async () => {
    try {
        if (!user.email) {
            toast.error("Please enter email");
            return;
        }
        const resp = await axios.post('/api/users/resetEmail', {email: user.email});
        toast.success(resp.data.message);
    }
    catch (error: any) {
        toast.error(error.response?.data?.message);
        //toast.error(error.message);
    }
  }

  const onLogin = async () => {

    if (!user.email || !user.password) {
        toast.error("Please enter both email and password");
        return;
    }

    try {
        setLoading(true);

        const resp = await axios.post('/api/users/login', user);
        toast.success("Login success");

        router.push('/profile');

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

        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={e => setUser({...user, email: e.target.value})}
            placeholder="email"
        >
        </input>

        <label htmlFor="password">password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
        >
        </input>

        <button onClick={onLogin} className="p-2 border border-gray-300
         rounded-lg mb-4 cursor-pointer hover:bg-gray-800 focus:outline-none focus:border-gray-600">
            Login here
        </button>
        <p>Not a Member?</p>
        <Link className="inline-block bg-blue-900 hover:bg-blue-800 text-white
        py-1 px-2 rounded" href="/signup">Sign Up</Link>

        <p className="mt-8"></p>
        <button onClick={sendResetPasswdEmail} className="p-2 border border-gray-300
         rounded-lg mb-4 cursor-pointer bg-amber-950 hover:bg-gray-800 focus:outline-none focus:border-gray-600">
            Forgot Password?
        </button>
    </div>
  )
}

export default LoginPage
