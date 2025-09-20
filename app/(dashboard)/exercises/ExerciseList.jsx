"use client"

import { useEffect, useState } from "react"
import { IoClose, IoSearch } from "react-icons/io5"
import Image from "next/image";
import Link from "next/link";

// API call to get exercises
export async function getExercises() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}

export default function ExerciseList() {
    // Search bar funcionality
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)

    const [results, setResults] = useState([])
    
    useEffect(() => {
        getExercises().then((res) => {setResults(res)})
    },[])

    const searchFilter = []

    // When rendering, only show ones not in searchFilter
    const visible = results.filter(ex =>
        !searchFilter.includes(ex.exerciseId)
    );
  return (
    <div className="flex flex-col w-full bg-yellow-200">
        {/* Search bar with input, clear text button and search */}
        <div className="flex w-full bg-purple-400">
            <input className="grow" type="text" placeholder="Search exercises (e.g Dumbbell).."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
            />
            <button className="flex items-center justify-center p-2 cursor-pointer" type="button"
            onClick={() => {setSearchQuery("")}}>
                <IoClose size={25} color="gray"/>
            </button>
            <button className="flex items-center justify-center p-2 bg-blue-500 cursor-pointer" type="button"
            onClick={() => {setShowSearchResults(true)}}>
                <IoSearch size={30} />
            </button>
        </div>

        {/* Search result drop down container. Only shown after search */}
        {showSearchResults == true && (
            <div>
                {
                    visible.map(exercise => (
                        <Link key={exercise.exerciseId} href={`/exercises/${exercise.exerciseId}`}>
                            <div>
                                <div className="cursor-pointer flex w-full border-2 border-gray-400">

                                <Image
                                    src={"/exercise_img/"+exercise.gifUrl}
                                    alt="none"
                                    width={100}
                                    height={100}/>

                                <h3>{exercise.name}</h3>
                                
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )}
    </div>
  )
}