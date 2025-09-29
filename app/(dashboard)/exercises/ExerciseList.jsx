"use client"

import { useEffect, useState } from "react"
import { IoClose, IoSearch } from "react-icons/io5"
import Image from "next/image";
import Link from "next/link";
import { useUser } from "../UserProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// API call to get exercises
// export async function getExercises() {
//   const res = await fetch("https://api.jsonsilo.com/public/822f6e17-a05f-4945-bac0-9a57fafdd254")

//   const data = await res.json();

//   return data.exercises;
// }

export default function ExerciseList() {
    const [includedExercises, setIncludedExercises] = useState([])
    const [includedExercisesData, setIncludedExercisesData] = useState([])

    const { workouts } = useUser();
    
    // Gets the data needed to automatically included exercises from the user's workouts
    useEffect(() => {
        const uniqueExercises = new Set();

        workouts.forEach(workout => {
        Object.keys(workout.workout.exercises).forEach(exercise_id => {
            uniqueExercises.add(exercise_id);
        });
        });

        setIncludedExercises(Array.from(uniqueExercises))

        async function getIncludedExerciseData(){
            const res = await fetch(`${location.origin}/api/exercises`)
            const exercises = await res.json()

            const filteredExercisesData = exercises.filter((exr) => {
                // returns exercises that include the search query and are NOT already in the selected exercises
                return Array.from(uniqueExercises).includes(exr.exerciseId)
            })

            setIncludedExercisesData(Array.from(filteredExercisesData))
        }

        if(Array.from(uniqueExercises).length > 0){
            getIncludedExerciseData()
        }
    }, [workouts])

    // -----------

    // Search bar funcionality
    const [searchQuery, setSearchQuery] = useState("")
    const [performedSearch, setPerformedSearch] = useState(false)
    const [searchingExercises, SetSearchingExercises] = useState(false)

    // Holds results of performed search
    const [results, setResults] = useState([])

    // Searches for exercises and sets the results
    async function searchExercises(){
        setPerformedSearch(true)
        SetSearchingExercises(true)

        const res = await fetch(`${location.origin}/api/exercises`)
        const exercises = await res.json()
        // const exercises = await getExercises()

        const filteredExercises = exercises.filter((exr) => {
            // returns exercises that include the search query and are NOT already in the selected exercises
            return (exr.name.includes(searchQuery) && !includedExercises.includes(exr.exerciseId))
        })

        setResults(filteredExercises)
        SetSearchingExercises(false)
    }


  return (
    <div className="flex flex-col w-full gap-1 mb-12">
        {/* Displays exercises included in workouts, if there are any */}
        {includedExercises.length > 0 && (
            <div>
                <div className="text-center text-2xl font-semibold">Included exercises</div>

                <div className="flex flex-col gap-1">
                    {includedExercisesData.map(exercise => (
                        <Link key={exercise.exerciseId} href={`/exercises/${exercise.exerciseId}`}>
                            <div className="grow">
                                <div
                                className="cursor-pointer flex w-full border-2 border-gray-400"
                                >
                            
                                <Image
                                    src={"/exercise_img/"+exercise.gifUrl}
                                    alt="none"
                                    height={256}
                                    width={256}
                                    />

                                <h3 className="font-semibold p-2">{`${exercise.name.charAt(0).toUpperCase()}${exercise.name.slice(1)}`}</h3>
                                
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        {/* Search bar with input, clear text button and search */}
        <div className="flex w-full bg-white rounded-sm border-2 border-gray-400">
            {/* Input for performing search query */}
            <input className="grow p-2" type="text" placeholder="Search exercises (e.g Dumbbell).."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
            />

            {/* Button that clears the current search term */}
            <button className="flex items-center justify-center p-2 cursor-pointer" type="button"
            onClick={() => {setSearchQuery("")}}>
                <IoClose size={25} color="gray"/>
            </button>

            {/* Button that searches exercises when clicked. Shows a loading icon while performing searches */}
            <button className="flex items-center justify-center p-2 bg-blue-500 cursor-pointer" type="button"
            onClick={() => {searchExercises()}}>
                {(!searchingExercises) ? <IoSearch size={30} /> : <AiOutlineLoading3Quarters size={30} className="loading-icon"/>}
            </button>
        </div>

        {/* Displayed if no search results were found */}
        {(performedSearch && results.length == 0) && (
            <div className="empty-search">No search results found</div>
        )}

        {/* Search result drop down container */}
        <div className="flex flex-col gap-1">
            {
                results.map(exercise => (
                    <Link key={exercise.exerciseId} href={`/exercises/${exercise.exerciseId}`}>
                        <div className="grow">
                            <div
                            className="cursor-pointer flex w-full border-2 border-gray-400"
                            >
                        
                            <Image
                                src={"/exercise_img/"+exercise.gifUrl}
                                alt="none"
                                height={256}
                                width={256}
                                />

                            <h3 className="font-semibold p-2">{`${exercise.name.charAt(0).toUpperCase()}${exercise.name.slice(1)}`}</h3>
                            
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

// {showSearchResults == true && (
// <div>
//     {
//         visible.map(exercise => (
//             <Link key={exercise.exerciseId} href={`/exercises/${exercise.exerciseId}`}>
//                 <div>
//                     <div className="cursor-pointer flex w-full border-2 border-gray-400">

//                     <Image
//                         src={"/exercise_img/"+exercise.gifUrl}
//                         alt="none"
//                         width={100}
//                         height={100}/>

//                     <h3>{exercise.name}</h3>
                    
//                     </div>
//                 </div>
//             </Link>
//         ))
//     }
// </div>
// )}