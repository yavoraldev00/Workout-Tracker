"use client"

import { useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";


export default function ExerciseInputData({ numberOfSets, setNumberOfSets, test, exercise }) {
  useEffect(()=>{},[numberOfSets])
  
  return (
    <div>
        {
          Array.from({ length: numberOfSets }, (_, i) => i + 1)
          .map((set_number, index) => (
              <>
                  {
                      (set_number == 1) ? 
                      <div></div>
                      :
                      <button onClick={(e)=>{e.preventDefault(); setNumberOfSets(numberOfSets - 1)}} className="mx-auto"><IoRemove /></button>
                  
                  }

                  <input type="number" onChange={(e) => {test(exercise, index, e.target.name, e.target.value)}} name="reps" key={`set_${set_number}_reps`} className="bg-amber-200"/>
                  <input type="number" name="weight" key={`set_${set_number}_weight`} className="bg-amber-200"/>
              </>
          ))

          
      }

      {numberOfSets < 5 && (<button onClick={(e)=>{e.preventDefault(); setNumberOfSets(numberOfSets + 1)}} className="mx-auto"><IoAdd /></button>)}
    </div>
  )
}