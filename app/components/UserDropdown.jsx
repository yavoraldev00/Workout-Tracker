"use client"

import { useState } from "react"
import { useUser } from "../(dashboard)/UserProvider";
import { createBrowserClient } from "@supabase/ssr";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  const { userName } = useUser();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    );

    // Clears supabase cookies
    await supabase.auth.signOut();

    // Used instead of router.push() to ensure cookies are cleared
    window.location.href = `${location.origin}/login`;
  };

  return (
    <>
    <button
        onClick={() => setOpen(!open)}
        className="bg-white cursor-pointer p-4 text-lg font-semibold rounded-2xl"
    >
        {userName}
    </button>

    {/* Dropdown with logout button */}
    {open && (
        <div className="absolute right-0 mt-2 w-full bg-white rounded shadow-lg">
        <button type="button" className="w-full text-center py-2 cursor-pointer"
        onClick={() => {handleLogout()}}>
            Logout
        </button>
        </div>
    )}
    </>
  )
}
