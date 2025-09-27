"use client"

import { useContext, useEffect, useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";
import { delayUntilRuntimeStage } from "next/dist/server/app-render/dynamic-rendering";


export default function ExerciseInputData({ numberOfSets, setNumberOfSets, exercise, importedLoad }) {
  // Gets function to set exercise data from CreateWorkout
  const { adjustExerciseData, formMode } = useContext(CreateWorkoutContext);
  
  // Creates a row for each Set. Component gets rebuilt when the number of sets change
  useEffect(()=>{},[numberOfSets])
  return (<>
        {
          Array.from({ length: numberOfSets }, (_, i) => i + 1)
          .map((set_number, index) => (
              <div key={set_number} className={(index % 2 === 0) ? 'bg-white' : 'bg-gray-100'}>
                  {
                      ((index === numberOfSets - 1 && numberOfSets > 1) && !(formMode == "View") ) ? 
                      <button
                        onClick={(e) => {
                          debugger;
                          e.preventDefault();

                          // If NOT in "View" mode, allows user to add or remove sets
                          if(!(formMode == "View")){
                            setNumberOfSets(numberOfSets - 1);
                            // tell parent to remove the set data for this exercise (remove last set)
                            adjustExerciseData(exercise, index, "remove_set");
                          }
                        }}
                        className="mx-auto"
                      >
                        <IoRemove />
                      </button>
                      :
                      <div></div>
                  
                  }

                  <div>{index+1}</div>

                  <input
                    required
                    disabled = {formMode == "View"} // Disables inputs in "View" mode
                    type="number"
                    onChange={(e) => {adjustExerciseData(exercise, index, e.target.name, e.target.value)}}
                    name="reps"
                    key={`set_${set_number}_reps`}
                    placeholder={
                      (importedLoad[index]) ? importedLoad[index][0] : ""
                    }
                  />
                  <input
                    required
                    disabled = {formMode == "View"} // Disables inputs in "View mode"
                    type="number"
                    name="weight"
                    onChange={(e) => {adjustExerciseData(exercise, index, e.target.name, e.target.value)}}
                    key={`set_${set_number}_weight`}
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