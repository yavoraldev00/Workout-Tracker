"use client"

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";
import ExerciseInputData from "./ExerciseInputData";
import { IoAdd, IoClose } from "react-icons/io5";
import { getExercises } from "./SearchExercise";

export default function ExerciseSpecifics({ exercise, setSelectedExercises }) {
  // Number of sets for an exercise. Minimum 1, maximum 5
  const [sets, setSets] = useState(1)

  const { selectedExercises, importedExercises, formMode } = useContext(CreateWorkoutContext);
  const [importedLoad, setImportedLoad] = useState({});

  const [exerciseData, setExerciseData] = useState([])

  // If there are imported exercises, sets the number of sets to match it
  useEffect(() => {
    if(Object.keys(importedExercises).length > 0){
      // Checks if there is data for an imported exercise and adds it as a placeholder
      if(importedExercises[exercise]){
        setSets(importedExercises[exercise].load.length);
  
        const loadToImport = structuredClone(importedExercises[exercise].load);
        setImportedLoad(loadToImport);

        getExercises().then((res) => {setExerciseData(Array.from(res).filter((exr)=>{return exr.exerciseId == exercise}))})
      }else{
        getExercises().then((res) => {setExerciseData(Array.from(res).filter((exr)=>{return exr.exerciseId == exercise}))})
      }
    }else{
      getExercises().then((res) => {setExerciseData(Array.from(res).filter((exr)=>{return exr.exerciseId == exercise}))})
    }
    // Only runs it on the initial build
  }, []);
    return (
    <div className="exercise-specific-card">
        {/* Button for removing an exercise from the selected exercises list */}
        
        {(formMode == "Edit" || formMode == "Create") && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              setSelectedExercises(currentExercises => {
                const newExercises = { ...currentExercises }; // Create a copy
                delete newExercises[exercise]; // Remove the exercise by its key
                return newExercises; // Return the new object
              })
            }} 
            className="absolute top-0 right-0 border-2 border-white rounded-lg cursor-pointer"
          >
            < IoClose size={28} color="white" className="bg-red-600 rounded-lg"/>
          </button>
        )}

        {/* Selected exercise image */}
        <Image src={`/exercise_img/${exercise}.gif`} alt="shhh" width={204} height={204}/>

        {/* Selected exercise title and container holding exercise input load */}
        <div>
            <h3 className="text-xl font-semibold mb-4">{(exerciseData[0]) ? `${exerciseData[0].name.charAt(0).toUpperCase()}${exerciseData[0].name.slice(1)}` : ""}</h3>

            <div className="exercise-load-grid">
                {/* Number of reps and weight */}
                <div className="bg-gray-100 font-bold">
                  <span></span>
                  <span>Set</span>
                  <span>Reps</span>
                  <span>Weight</span>
                </div>
                
                {/* Component that creates input cells based on the number of sets */}
                <ExerciseInputData
                  numberOfSets={sets}
                  setNumberOfSets={setSets}
                  exercise={exercise}
                  importedLoad={importedLoad}
                />

                {/* Add button to add another set. Doesn't show if there's 5 sets (maximum) */}
                {/* Cannot new sets in "View" mode */}
                {((sets < 5) && (formMode !== "View")) && (
                  <div>
                    <button onClick={(e)=>{e.preventDefault(); if(!(formMode == "View")){setSets(sets + 1)}}} className="mx-auto mt-2">
                      <IoAdd className="add-icon" />
                    </button>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
            </div>
        </div>
    </div>
  )
}
