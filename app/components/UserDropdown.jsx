"use client"

import { useState } from "react"

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <button
        onClick={() => setOpen(!open)}
        className=""
    >
        Username
    </button>

    {/* Dropdown with logout button */}
    {open && (
        <div className="absolute right-0 mt-2 w-32 bg-black rounded shadow-lg">
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-300 transition-all duration-500">
            Logout
        </button>
        </div>
    )}
    </>
  )
}
