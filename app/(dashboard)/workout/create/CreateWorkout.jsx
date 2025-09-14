"use client"

import { useState } from "react";
import Exercises from "./Exercises";

export default function CreateWorkout() {
  const [workoutName, setWorkoutName] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [exerciseLoad, setExerciseLoad] = useState({})

  function addExerciseToWorkout(exerciseToAdd) {
    if (!selectedExercises.find(ex => ex === exerciseToAdd.exerciseId)) {
       setSelectedExercises(currentExercises => [...currentExercises, exerciseToAdd.exerciseId]);
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    console.log(workoutName)
  }

  return (
    <>
    <form onSubmit={submitForm} className="m-2 relative">
      <label>
        <span className="mr-4">Workout name:</span>
        <input
        required
        type="text"
        className="border-2 border-gray-400"
        onChange={(e) =>setWorkoutName(e.target.value)}
        />
      </label>

      <h2 className="sub-title">Exercises</h2>

      { selectedExercises.length == 0 ? (<p>Select some exercises</p>) : selectedExercises.map((exr) => (
        <div id={exr}>
          <h3>{exr}</h3>
        </div>
      )) }

      <Exercises onExerciseSelect = {addExerciseToWorkout} searchFilter = {selectedExercises} />

      <button className="border-2 border-gray-400 absolute right-0 top-0">Create</button>
    </form>
    </>
  )
}
