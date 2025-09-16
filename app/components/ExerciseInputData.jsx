"use client"

import { useContext, useEffect, useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";


export default function ExerciseInputData({ numberOfSets, setNumberOfSets, exercise, importedLoad }) {
  // Gets function to set exercise data from CreateWorkout
  const { adjustExerciseData } = useContext(CreateWorkoutContext);
  
  // Creates a row for each Set. Component gets rebuilt when the number of sets change
  useEffect(()=>{},[numberOfSets])
  return (<>
        {
          Array.from({ length: numberOfSets }, (_, i) => i + 1)
          .map((set_number, index) => (
              <div key={set_number}>
                  {
                      (index === numberOfSets - 1 && numberOfSets > 1) ? 
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setNumberOfSets(numberOfSets - 1);
                          // tell parent to remove the set data for this exercise (remove last set)
                          adjustExerciseData(exercise, index, "remove_set");
                        }}
                        className="mx-auto"
                      >
                        <IoRemove />
                      </button>
                      :
                      <div></div>
                  
                  }

                  <input
                    required
                    type="number"
                    onChange={(e) => {adjustExerciseData(exercise, index, e.target.name, e.target.value)}}
                    name="reps"
                    key={`set_${set_number}_reps`}
                    className="bg-amber-200"
                    placeholder={
                      (importedLoad[index]) ? importedLoad[index][0] : ""
                    }
                  />
                  <input
                    required
                    type="number"
                    name="weight"
                    onChange={(e) => {adjustExerciseData(exercise, index, e.target.name, e.target.value)}}
                    key={`set_${set_number}_weight`}
                    className="bg-amber-200"
                    placeholder={
                      (importedLoad[index]) ? importedLoad[index][1] : ""
                    }
                  />
              </div>
          ))

          
      }
      </>
  )
}