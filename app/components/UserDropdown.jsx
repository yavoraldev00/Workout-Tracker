"use client"

import { useState } from "react"

export default function UserDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <button
        onClick={() => setOpen(!open)}
        className="bg-gray-500 cursor-pointer p-4"
    >
        Username
    </button>

    {/* Dropdown with logout button */}
    {open && (
        <div className="absolute right-0 mt-2 w-full bg-black rounded shadow-lg">
        <button className="w-full text-center py-2 cursor-pointer">
            Logout
        </button>
        </div>
    )}
    </>
  )
}
