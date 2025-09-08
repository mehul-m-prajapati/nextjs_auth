'use client'

import { useParams } from "next/navigation"

function UserProfile() {

  const params = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">Profile page</h1>
         <hr />
         <p className="text-2xl mt-2">
            <span className=" p-2 ml-2 rounded bg-orange-700 text-black">{params.id}</span>
         </p>
    </div>
  )
}

export default UserProfile
