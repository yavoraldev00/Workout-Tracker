"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoAdd, IoClose } from "react-icons/io5";
import ExerciseItem from "./ExerciseItem";

// API call to get exercises
export async function getExercises() {
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
        <ExerciseItem onExerciseSelect = {onExerciseSelect} setAddNew = {setAddNew} visible={visible}/>
      )
    }

    </div>
  )
}