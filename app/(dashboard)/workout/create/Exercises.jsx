"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";

// API call to get exercises
async function getExercises() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}

export default function Exercises({ onExerciseSelect, searchFilter }) {
  const [exercises, setExercises] =  useState([])
  const [addNew, setAddNew] = useState(false)

  // Sets the initial exercises with API call 
  useEffect(()=>{
    getExercises(searchFilter).then(res => setExercises(res))
  }, [])

  // // After an exercise is selected, removes it
  // useEffect(()=>{
  //   setExercises(
  //     exercises.filter((el) =>{return !searchFilter.includes(el.exerciseId)})
  //   )
  // }, [searchFilter])

  // When rendering, only show ones not in searchFilter
  const visible = exercises.filter(ex =>
    !searchFilter.includes(ex.exerciseId)
  );
  
  return (
    <div className="exercise-list relative flex flex-col gap-4 items-center bg-green-300 my-4 mx-auto w-1/2">
      { !addNew ? (
        <button onClick={(e)=>{e.preventDefault(); setAddNew(true)}} className="p-8 my-4 border-2 border-gray-400 rounded-xl cursor-pointer bg-gray-300">
          < IoAdd size={50} color="black"/>
        </button>
      ) : (
        <>
        <button onClick={(e)=>{e.preventDefault(); setAddNew(false)}} className="absolute top-0 right-0 p-4 cursor-pointer">
          < IoClose size={24} color="white" className="bg-red-600"/>
        </button>
        {visible.map(exr => (
          <div key={exr.exerciseId}
            onClick={() => {setAddNew(false); onExerciseSelect(exr)}}
            className="cursor-pointer flex w-full border-2 border-gray-400">
          
          <Image
            src={"/exercise_img/"+exr.gifUrl}
            alt="none"
            width={100}
            height={100}/>

          <h3>{exr.name}</h3>
          </div>
        ))}
        </>
      )
    }

    </div>
  )
}