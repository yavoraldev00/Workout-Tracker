"use client"

import { createContext, useContext, useEffect, useState } from "react";
import Exercises from "./Exercises";
import ExerciseSpecifics from "@/app/components/ExerciseSpecifics";

// Context for passing variables and functions from createContext to ExerciseInputData
export const CreateWorkoutContext = createContext();

export default function CreateWorkout({ selectedWorkoutTemplate }) {
  // Variable that stores the imported workout, if there is one
  const [importedExercises, setImportedExercises] = useState({})
  
  // Variable holding the name of the workout
  const [workoutName, setWorkoutName] = useState("")

  // Variable holding the exercise object. Includes name and exercise details
  const [selectedExercises, setSelectedExercises] = useState({})

  // If data is NOT passed to CreateWorkout (accessed from /create page instead of /workout/[id]), starts in creation mode. Determines which database call is made.
  const [creationMode, setCreationMode] = useState(true)

  // Editable by default. If accessed in /workout/[id], disabled and workout can only be viewed. Changed on "Start workout" and "Edit workout"
  const [editMode, setEditMode] = useState(true)

  useEffect(() => {
    if (selectedWorkoutTemplate) {
      // 1. Update the workout name
      setWorkoutName(selectedWorkoutTemplate.workout.name);

      // 2. Deep-clone the exercises object
      //    - structuredClone is native in modern browsers/node
      //    - fallback: JSON.parse(JSON.stringify(...))
      const exercisesClone = structuredClone(selectedWorkoutTemplate.workout.exercises);

      setSelectedExercises(exercisesClone);
      setImportedExercises(exercisesClone);
      setEditMode(false);
    }
  }, []);

  // Object structure
  // {
  //   "name": "Workout Name",
  //   "exercises":{
  //      "exercise_id": {
  //        "load": [[]], // [[5,10], [10,25]] An array containing all sets. Each sets is composed of an array with [[0] - number of reps [1] - number of sets]
  //        "volume": 0 // The total volume of the exercise. Sum of the multipe of the reps * sets. Example [5*10] + [10*25] The value of volume is 50 + 250 = 300
  //          },
  //      "exercise_id": {....}
  //   }
  // }

  // Function that sets the entered data into the
  const adjustExerciseData = (exercise_id, set_number, data_type, data_value) => {
    const value = Number(data_value) || 0;

    setSelectedExercises((current) => {
      const currentExercise = current[exercise_id] || { load: [[]], volume: 0 };

      // defensive: ensure load is an array
      const loads = Array.isArray(currentExercise.load) ? currentExercise.load.map((arr) => Array.isArray(arr) ? arr.slice() : []) : [];

      // ensure the set index exists, fill missing sets with [0,0]
      for (let i = 0; i <= set_number; i++) {
        if (!loads[i]) loads[i] = [0, 0];
      }

      // update reps (index 0) or weight (index 1)
      if (data_type === "reps") loads[set_number][0] = value;
      if (data_type === "weight") loads[set_number][1] = value;

      // handle removing an entire set vs. updating reps/weight
      if(data_type === "remove_set"){
        loads.splice(set_number, 1);
      }else {
        if (data_type === "reps")  loads[set_number][0] = value;
        if (data_type === "weight") loads[set_number][1] = value;
      }

      // recalculate volume: sum of reps * weight for sets where both > 0
      const volume = loads.reduce((sum, set) => {
        const reps = Number(set[0]) || 0;
        const weight = Number(set[1]) || 0;
        return sum + reps * weight;
      }, 0);

      return {
        ...current,
        [exercise_id]: {
          load: loads,
          volume
        }
      };
    });
  };

  function addExerciseToWorkout(exerciseToAdd) {
    // Check if the exercise ID doesn't already exist as a key
    if (!selectedExercises.hasOwnProperty(exerciseToAdd.exerciseId)) {
      setSelectedExercises(currentExercises => ({
        // Keep the existing exercises
        ...currentExercises,
        // Add the new exercise with its ID as the key
        [exerciseToAdd.exerciseId]: {
          exercise_load: [[]],
          volume: 0
        }
      }));
    }
  }

  async function submitForm(e) {
    e.preventDefault();

    console.log(workoutName)
  }

  return (
    <CreateWorkoutContext.Provider value={{ selectedExercises, adjustExerciseData, importedExercises, editMode }}>
      <form onSubmit={submitForm} className="m-2 relative">

        {/* Shows Workout name if in Edit mode in workout/[id]. Always shown on workout/create page */}
        {editMode && (
          <label>
            <span className="mr-4">Workout name:</span>

            <input
              required
              type="text"
              className="border-2 border-gray-400"
              onChange={(e) =>setWorkoutName(e.target.value)}
              value={workoutName}
            />
          </label>
        )}

        <h2 className="sub-title">Exercises</h2>

        { Object.keys(selectedExercises).length === 0 ? (<p>Select some exercises</p>) : Object.keys(selectedExercises).map((exerciseId) => 
        (
          <ExerciseSpecifics key={exerciseId} exercise = {exerciseId} setSelectedExercises = {setSelectedExercises}/>
        )
        ) }

        {Object.keys(importedExercises).length == 0 && (
          <Exercises onExerciseSelect = {addExerciseToWorkout} searchFilter = {Object.keys(selectedExercises)} />
        )}

        <button className="border-2 border-gray-400 absolute right-0 top-0">Create</button>
      </form>
    </CreateWorkoutContext.Provider>
  )
}
