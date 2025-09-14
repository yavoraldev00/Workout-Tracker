"use client"

import Image from "next/image";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

export default function ExerciseSpecifics() {
  const [sets, setSets] = useState(1)

    return (
    <div className="flex">
        <Image src="/exercise_img/2Qh2J1e.gif" width={128} height={128}/>
        <div>
            <h3>exercise name</h3>

            {/* Number of reps and weight */}
            <div className="flex">
                {/* Shows button if less than 5 sets */}
                <button>
                    <IoAdd />
                </button>

                {/* Shows if the add button has been clicked, so add button doesn't appear with these */}
                <input name="sets"/>
                <input name="sets"/>
            </div>


        </div>
    </div>
  )
}
