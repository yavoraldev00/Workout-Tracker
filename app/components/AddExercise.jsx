"use client"

import { useState } from "react"
import { IoAdd, IoClose, IoSearch } from "react-icons/io5"
import SearchExercise from "./SearchExercise"

export default function AddExercise() {
    // State determining if Add button shows or list is shown. Shows button by default
    const [showAdd, setShowAdd] = useState(true)
  return (
    <div className="mt-8">
        {/* Add icon, search bar with search and close icons */}
        <div className="flex flex-col items-center md:w-4/5 md:mx-auto">
            {showAdd && (
                <button type="button" onClick={()=>{setShowAdd(false)}} className="p-8 my-4 border-2 border-gray-400 rounded-xl cursor-pointer bg-gray-300">
                    < IoAdd size={50} color="black"/>
                </button>
            )}
            {!showAdd && (
                <div className="relative flex w-full">
                    <SearchExercise setShowAdd = {setShowAdd} />

                    <button className="aboslute top-0 right-0 aspect-square h-fit flex items-center justify-center p-2 bg-red-500 -translate-y-[70%] translate-x-[40%] scale-75 md:-translate-y-[0%] md:translate-x-[0%] md:scale-100 cursor-pointer"
                    type="button"
                    onClick={()=>{setShowAdd(true)}}
                    >
                        <IoClose size={30} color="white"/>
                    </button>
                </div>
            )}
        </div>

        {/* Displays exercise search items */}
        {/* <div>

        </div> */}
    </div>
  )
}
