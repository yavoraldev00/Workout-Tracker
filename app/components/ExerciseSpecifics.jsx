"use client"

import Image from "next/image";
import { useState } from "react";
import ExerciseInputData from "./ExerciseInputData";
import { IoClose } from "react-icons/io5";

export default function ExerciseSpecifics({ exercise, setSelectedExercises }) {
  const [sets, setSets] = useState(1)
  const [setLoad, setSetLoad] = useState([[]])

    return (
    <div className="flex relative" key={exercise}>
        <button onClick={(e)=>{e.preventDefault(); setSelectedExercises(prev => prev.filter(ex => ex !== exercise)) }} className="absolute top-0 right-0 p-4 cursor-pointer">
          < IoClose size={24} color="white" className="bg-red-600"/>
        </button>

        <Image src={`/exercise_img/${exercise}.gif`} alt="shhh" width={128} height={128}/>
        <div>
            <h3>exercise name</h3>

            <div className="exercise-load-grid">
                <div><span>Set</span><span>Reps</span><span>Weight</span></div>
                    {/* Number of reps and weight */}
                
                {/* This is gonna be the component */}

                <ExerciseInputData numberOfSets={sets} setNumberOfSets={setSets}/>
            </div>
                {/* Shows button if less than 5 sets */}
                {/* Shows if the add button has been clicked, so add button doesn't appear with these */}
        </div>
    </div>
  )
}
