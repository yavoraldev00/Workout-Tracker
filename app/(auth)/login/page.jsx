"use client"

import { useState } from "react";

import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation.js";
// import { cookies } from "next/headers";
import { createBrowserClient } from "@supabase/ssr";

export default function page() {
  // Variable determining if in "Login" or "Register" mode
  const [login, setLogin] = useState(true)

  // Variables holding the user email, password and username
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  // Router for navigating user to homepage after login
  const router = useRouter();

  const handleSubmit = async function (e) {
    e.preventDefault();

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    // const cookieStore = await cookies()

    // Login
    if(login){
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
    
      if(error){
        return error
      }
    
      if(!error){
        const { data: { session } } = await supabase.auth.getSession();
        
        await fetch(`${location.origin}/api/session`, {
          method: "POST",
          body: JSON.stringify(session),
          headers: { "Content-Type": "application/json" },
        });

        router.push("/")
        router.refresh()

        return error
      }

    }else{ // Signup
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/api/auth/callback`,
          data: { 
            display_name: username
          }
        }
      })
    
      if(error){
        return error
      }
    
      if(!error){
        router.push("/verify")

        return error
      }
    }
  }
  
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
        onSubmit={(e) => {handleSubmit(e)}}
        className=" p-8 flex flex-col gap-4">
        {/* Shows username button only on registration */}
        {!login && (
          <label>
            <span>Username: </span>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="bg-white"/>
          </label>
        )}
        
        <label>
          <span>Email: </span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="bg-white"/>
        </label>

        <label>
          <span>Password: </span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="bg-white"/>
        </label>

        { login && <button className="bg-gray-500">Log-in</button>}
        { !login && <button className="bg-gray-500">Register</button>}
      </form>
    </div>
  )
}