"use client"

import { useContext, useEffect, useState } from "react"
import { IoClose, IoSearch } from "react-icons/io5"
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";
import Image from "next/image";

// API call to get exercises
export async function getExercises() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}

export default function SearchExercise({ setShowAdd }) {
    // Search bar funcionality
    const [searchQuery, setSearchQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)

    // Search results functionality
    const { selectedExercises, addExerciseToWorkout } = useContext(CreateWorkoutContext);

    const [results, setResults] = useState([])
    
    useEffect(() => {
        getExercises().then((res) => {setResults(res)})
    },[])

    const searchFilter = Object.keys(selectedExercises)

    // When rendering, only show ones not in searchFilter
    const visible = results.filter(ex =>{
        debugger;
        !searchFilter.includes(ex.exerciseId)
    }
    );

    debugger;
  return (
    <div className="flex flex-col w-full gap-1">
        {/* Search bar with input, clear text button and search */}
        <div className="flex w-full bg-white rounded-sm border-2 border-gray-400">
            <input className="grow p-2" type="text" placeholder="Search exercises (e.g Dumbbell).."
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

        {/* Search result drop down container */}
        <div className="flex flex-col gap-1">
            {
                visible.map(exercise => (
                    <div key={exercise.exerciseId} className="grow">
                        <div
                        onClick={() => {setShowAdd(true); addExerciseToWorkout(exercise)}}
                        className="cursor-pointer flex w-full border-2 border-gray-400"
                        >
                    
                        <Image
                            src={"/exercise_img/"+exercise.gifUrl}
                            alt="none"
                            size={256}/>

                        <h3 className="font-semibold p-2">{`${exercise.name.charAt(0).toUpperCase()}${exercise.name.slice(1)}`}</h3>
                        
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
