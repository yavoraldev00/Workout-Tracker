"use client"

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";
import ExerciseInputData from "./ExerciseInputData";
import { IoAdd, IoClose } from "react-icons/io5";

export default function ExerciseSpecifics({ exercise, setSelectedExercises }) {
  // Number of sets for an exercise. Minimum 1, maximum 5
  const [sets, setSets] = useState(1)

  const { selectedExercises, importedExercises } = useContext(CreateWorkoutContext);
  const [importedLoad, setImportedLoad] = useState({});

  // If there are imported exercises, sets the number of sets to match it
  useEffect(() => {
    if(Object.keys(importedExercises).length > 0){
      setSets(importedExercises[exercise].load.length);

      const loadToImport = structuredClone(importedExercises[exercise].load);
      setImportedLoad(loadToImport);
    }
    // Only runs it on the initial build
  }, []);

    return (
    <div className="flex relative" key={exercise}>
        {/* Button for removing an exercise from the selected exercises list */}
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

        {/* Selected exercise image */}
        <Image src={`/exercise_img/${exercise}.gif`} alt="shhh" width={128} height={128}/>

        {/* Selected exercise title and container holding exercise input load */}
        <div>
            <h3>Exercise name</h3>

            <div className="exercise-load-grid">
                {/* Number of reps and weight */}
                <div><span>Set</span><span>Reps</span><span>Weight</span></div>
                
                {/* Component that creates input cells based on the number of sets */}
                <ExerciseInputData
                  numberOfSets={sets}
                  setNumberOfSets={setSets}
                  exercise={exercise}
                  importedLoad={importedLoad}
                />

                {/* Add button to add another set. Doesn't show if there's 5 sets (maximum) */}
                {sets < 5 && (
                  <div>
                    <button onClick={(e)=>{e.preventDefault(); setSets(sets + 1)}} className="mx-auto">
                      <IoAdd />
                    </button>
                    <div></div>
                    <div></div>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}
