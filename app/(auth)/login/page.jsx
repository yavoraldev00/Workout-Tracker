"use client"

import { useState } from "react";

export default function page() {
  const [login, setLogin] = useState(true);

  return (
    <div className="p-12 bg-gray-200 text-black">
      <div className="w-full flex justify-center gap-1">
        <button className="cursor-pointer bg-gray-500"
        onClick={() => {
          if(login !== true){setLogin(true)}
        }}
        >Log-in</button>
        <button className="cursor-pointer bg-gray-500"
        onClick={() => {
          if(login == true){setLogin(false)}
        }}
        >Register</button>
      </div>
      <form 
        onSubmit={(e) => {e.preventDefault(); console.log("hello")}}
        className=" p-8 flex flex-col gap-4">
        <label>
          <span>Email: </span>
          <input type="email" required className="bg-white"/>
        </label>

        <label>
          <span>Password: </span>
          <input type="password" required className="bg-white"/>
        </label>

        { login && <button className="bg-gray-500">Log-in</button>}
        { !login && <button className="bg-gray-500">Register</button>}
      </form>
    </div>
  )
}