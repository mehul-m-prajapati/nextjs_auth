'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";

function VerifyEmailPage() {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(true);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {

    try {
        await axios.post('/api/users/verifyemail', {token});
        setVerified(true);

        toast.success('Email verified');

    } catch (error: any) {
        setError(true);
        console.log(error.reponse.data.error);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
        verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl">Verify Email</h1>

        <h2 className="p-2 bg-gray-800 text-white">
            Token: {token ? `${token}` : "no token"}
        </h2>

        {verified && (
            <div>
                <h2 className="text-xl mt-4">Email Verified ✅</h2>
                <Link className="mt-3 inline-block bg-blue-900 hover:bg-blue-800 text-white
                    py-2 px-4 rounded" href="/login">
                    Login
                </Link>
            </div>
          )
        }

        {error && (
            <div>
                <h2 className="mt-4 text-2xl bg-red-500 text-black">Error</h2>
            </div>
        )}
    </div>
  )
}

export default VerifyEmailPage
