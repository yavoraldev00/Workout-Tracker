"use client"

import Image from "next/image";
import { useState } from "react";
import ExerciseInputData from "./ExerciseInputData";

export default function ExerciseSpecifics() {
  const [sets, setSets] = useState(3)
  const [setLoad, setSetLoad] = useState([[]])

    return (
    <div className="flex">
        <Image src="/exercise_img/2Qh2J1e.gif" alt="shhh" width={128} height={128}/>
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
