"use client"

import { useState } from "react";

import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation.js";
// import { cookies } from "next/headers";
import { createBrowserClient } from "@supabase/ssr";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function page() {
  // Variable determining if in "Login" or "Register" mode
  const [login, setLogin] = useState(true)

  // Variables holding the user email, password and username
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  // Holds and displays error message if there is one
  const [errorMsg, setErrorMsg] = useState("")

  // Disables Log-in / Register submit button when performing request
  const [signingUser, SetSigningUser] = useState(false)

  // Router for navigating user to homepage after login
  const router = useRouter();

  const handleSubmit = async function (e) {
    e.preventDefault();
    
    SetSigningUser(true)
    setErrorMsg("")

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
        setErrorMsg(error.message)
        SetSigningUser(false)
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

        return
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
        setErrorMsg(error.message)
        SetSigningUser(false)
        return error
      }
    
      if(!error){
        router.push("/verify")
      }
    }
  }
  
  return (
    <div className="p-8 rounded-md bg-gray-200 text-black">
      <div className="w-full flex justify-center gap-1">
        <button className={`cursor-pointer ${(login) ? "bg-amber-300" : "bg-gray-100 text-gray-400"} p-2`}
          onClick={() => {
            if(login !== true){setLogin(true)}
          }}
        >Log-in</button>

        <button className={`cursor-pointer ${(!login) ? "bg-amber-300" : "bg-gray-100 text-gray-400"} p-2`}
          onClick={() => {
            if(login == true){setLogin(false)}
          }}
        >Register</button>
      </div>
      <form 
        onSubmit={(e) => {handleSubmit(e)}}
        className="p-8 flex flex-col gap-4">
        {/* Shows username button only on registration */}
        <div className="login-form-grid flex flex-col gap-4 mb-8">
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
        </div>

        { login && <button className="form-button" disabled={signingUser}>
          {(!signingUser) ?  "Log-in" : <AiOutlineLoading3Quarters size={24}/>}
        </button>}
        
        { !login && <button className="form-button">
          {(!signingUser) ?  "Register" : <AiOutlineLoading3Quarters size={24}/>}
        </button>}

        {errorMsg && (
          <div className="text-center text-sm font-thin italic text-white bg-red-500 py-2 rounded-2xl border-2 border-white">{errorMsg}</div>
        )}
      </form>
    </div>
  )
}