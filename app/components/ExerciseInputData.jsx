"use client"

import { useContext, useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";


export default function ExerciseInputData({ numberOfSets, setNumberOfSets, test, exercise }) {
  const { selectedExercises } = useContext(CreateWorkoutContext);

  useEffect(()=>{},[numberOfSets])
  return (
    <div>
        {
          Array.from({ length: numberOfSets }, (_, i) => i + 1)
          .map((set_number, index) => (
              <>
                  {
                      (index === numberOfSets - 1 && numberOfSets > 1) ? 
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setNumberOfSets(numberOfSets - 1);
                          // tell parent to remove the set data for this exercise (remove last set)
                          test(exercise, index, "remove_set");
                        }}
                        className="mx-auto"
                      >
                        <IoRemove />
                      </button>
                      :
                      <div></div>
                  
                  }

                  <input
                    type="number"
                    onChange={(e) => {test(exercise, index, e.target.name, e.target.value)}}
                    name="reps"
                    key={`set_${set_number}_reps`}
                    className="bg-amber-200"
                    placeholder="reps"
                  />
                  <input
                    type="number"
                    name="weight"
                    onChange={(e) => {test(exercise, index, e.target.name, e.target.value)}}
                    key={`set_${set_number}_weight`}
                    className="bg-amber-200"
                    placeholder="weight"
                  />
              </>
          ))

          
      }

      {numberOfSets < 5 && (<button onClick={(e)=>{e.preventDefault(); setNumberOfSets(numberOfSets + 1)}} className="mx-auto"><IoAdd /></button>)}
    </div>
  )
}