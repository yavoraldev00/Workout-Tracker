"use client"

import Image from "next/image";
import { useState } from "react";
import ExerciseInputData from "./ExerciseInputData";
import { IoClose } from "react-icons/io5";

export default function ExerciseSpecifics({ exercise, setSelectedExercises, test }) {
  const [sets, setSets] = useState(1)
  const [setLoad, setSetLoad] = useState([[]])

  // remove a specific set by index and inform parent (test) to remove that set from data
  const removeSetAt = (indexToRemove) => {
    setSets((current) => {
      const next = Math.max(1, current - 1);
      return next;
    });

    // tell CreateWorkout to remove the exact set index for this exercise
    test(exercise, indexToRemove, "remove_set");
  };

  // add a new empty set at the end
  const addSet = () => {
    setSets((current) => Math.min(5, current + 1));
  };

    return (
    <div className="flex relative" key={exercise}>
        
        <button 
        onClick={(e) => {
          e.preventDefault();
          setSelectedExercises(currentExercises => {
            const newExercises = { ...currentExercises }; // Create a copy
            delete newExercises[exercise]; // Remove the exercise by its key
            return newExercises; // Return the new object
          })
        }} 
        className="absolute top-0 right-0 p-4 cursor-pointer"
      >
          < IoClose size={24} color="white" className="bg-red-600"/>
        </button>

        <Image src={`/exercise_img/${exercise}.gif`} alt="shhh" width={128} height={128}/>
        <div>
            <h3>exercise name</h3>

            <div className="exercise-load-grid">
                <div><span>Set</span><span>Reps</span><span>Weight</span></div>
                    {/* Number of reps and weight */}
                
                {/* This is gonna be the component */}

                <ExerciseInputData
                  numberOfSets={sets}
                  setNumberOfSets={setSets}
                  test={test}
                  exercise={exercise}
                  onRemoveSet={removeSetAt}
                  onAddSet={addSet}/>
            </div>
                {/* Shows button if less than 5 sets */}
                {/* Shows if the add button has been clicked, so add button doesn't appear with these */}
        </div>
    </div>
  )
}
