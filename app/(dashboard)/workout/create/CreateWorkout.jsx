"use client"

import { createContext, useContext, useEffect, useState } from "react";
import postWorkout from "./postWorkout.js"
import postExercises from "./postExercises.js"
import Exercises from "../../../components/Exercises.jsx";
import ExerciseSpecifics from "@/app/components/ExerciseSpecifics";
import { usePathname, useRouter } from "next/navigation.js";
import AddExercise from "@/app/components/AddExercise.jsx";

// Context for passing variables and functions from createContext to ExerciseInputData
export const CreateWorkoutContext = createContext();

export default function CreateWorkout({ selectedWorkoutTemplate }) {
  // Variable that stores the imported workout, if there is one
  const [importedExercises, setImportedExercises] = useState({})
  
  // Variable holding the name of the workout
  const [workoutName, setWorkoutName] = useState("")

  // Variable holding the exercise object. Includes name and exercise details
  const [selectedExercises, setSelectedExercises] = useState({})

  // Stores the viewing mode of the show, which enabled / disables functionality depending on the mode
  // [ "Create", "View", "Edit", "Workout" ]
  // Starts off in "Create" mode by default. Changes to "View" if component called from workout/[id]
  const [formMode, setFormMode] = useState("Create")

  // Variable for showing the error message if a workout has no exercises
  const [selectExercisesError, setSelectExercisesError] = useState(false)

  // Router for navigating user to home page after workout creation
  const router = useRouter();

  // Pathname of the current page, used for cancelling edits made to template
  const pathname = usePathname();

  // Shows error after submitting an empty workout template, until an exercise is selected
  useEffect(() => {
    if(Object.keys(selectedExercises).length > 0){
      setSelectExercisesError(false)
    }
  },[selectedExercises])

  // Copies over template data to the current exercise data
  function setTemplateData() {
    // 1. Update the workout name
    setWorkoutName(selectedWorkoutTemplate.workout.name);

    // 2. Deep-clone the exercises object
    const exercisesClone = structuredClone(selectedWorkoutTemplate.workout.exercises);

    setSelectedExercises(exercisesClone);
    setImportedExercises(exercisesClone);
  }

  // If page is a specific workout/[id], copies over data and turns off creation mode
  useEffect(() => {
    if (selectedWorkoutTemplate) {
      // Calls template setting
      setTemplateData();

      setFormMode("View");
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

  // Adds exercise to selected exercises object
  function addExerciseToWorkout(exerciseToAdd) {
    // Check if the exercise ID doesn't already exist as a key
    if (!selectedExercises.hasOwnProperty(exerciseToAdd.exerciseId)) {
      setSelectedExercises(currentExercises => ({
        // Keep the existing exercises
        ...currentExercises,
        // Add the new exercise with its ID as the key
        [exerciseToAdd.exerciseId]: {
          load: [[]],
          volume: 0
        }
      }));
    }
  }

  // Cancels "Edit" or "Workout" mode, resets all data, refreshes page
  function cancelEditOrWorkoutMode(){
    setFormMode("View")
    
    // I do not understand why emptying it and then adding it back in 1ms renders it correctly but it do :)
    setSelectedExercises([])

    setTimeout(() => {
      setTemplateData()
    }, 1);
  }

  // Sends data to the database and redirects the user to the dashboard
  async function submitForm(e) {
    // Prevents form button from refreshing page
    e.preventDefault();

    // If there are no selected exercises, shows an error
    if(Object.keys(selectedExercises).length === 0){
      setSelectExercisesError(true);
      return
    }

    // Variable storing data to send to database to update workout
    const dataToSend = {
      // ID to update. If editing an existing template, uses that ID. If creating a new template, does not need an ID to upload workout
      id: (selectedWorkoutTemplate) ? selectedWorkoutTemplate.id : undefined,
      user_email: "me@gmail.com",
      workout: {
        name: workoutName,
        exercises: selectedExercises
      }
    }

    // If NOT in "Workout" mode, sends data about each exercise performed
    if(formMode == "Workout"){
      Object.keys(dataToSend.workout.exercises).forEach((exercise_id) => {
        // Holds the highest weight used during a workout
        let max_weight = Math.max(...selectedExercises[exercise_id].load.map(sub => sub[1]));
  
        postExercises(exercise_id, selectedWorkoutTemplate.user, selectedExercises[exercise_id].load, max_weight, selectedExercises[exercise_id].volume)
      })
    }

    // Variable holding the type of request to be made. If in creation mode, creates a new workout.
    // If NOT in creation mode, updates current workout
    const sendMethod = (formMode == "Create") ? "INSERT" : "UPDATE"
    
    // Function call to send data to database. Returns the request response (error or data)
    const res = await postWorkout(dataToSend, sendMethod);

    // If the response is an error, alerts the error. If there is no error, changes the form mode to "View" and redirects the user if needed
    if(res){
      alert(res.message)
    }else{
      // Sets the mode to "View"
      setFormMode("View")

      // If in "Create" or "Workout" mode, sends user to home screen
      if(formMode == "Create" || formMode == "Workout"){
        router.push("/")
      }
  
      // Refreshes fetch request to update database
      router.refresh()
    }
  }

  return (
    <CreateWorkoutContext.Provider value={{ selectedExercises, addExerciseToWorkout, adjustExerciseData, importedExercises, formMode }}>
      <form onSubmit={submitForm} className="m-2 relative">

        {/* Shows Workout name if in "Edit" or "Crete" mode */}
        {(formMode == "Edit" || formMode == "Create") && (
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

        {/* Shows the selected exercises, if there are any. If empty, urges user to select exercises */}
        { Object.keys(selectedExercises).length === 0 ? (<p>Select some exercises</p>) : Object.keys(selectedExercises).map((exerciseId) => 
        (
          <ExerciseSpecifics key={exerciseId} exercise = {exerciseId} setSelectedExercises = {setSelectedExercises}/>
        )
        ) }

        {/* Allows user to select exercises to add to their workout */}
        {/* {Object.keys(importedExercises).length == 0 && (
          <Exercises onExerciseSelect = {addExerciseToWorkout} searchFilter = {Object.keys(selectedExercises)} />
        )} */}

        {/* Allows user to select exercises to add, only shown in "Edit" and "Create" mode */}
        {(formMode == "Edit" || formMode == "Create") && (
          <AddExercise />
        )}

        {/* Container for form buttons. Edit, Finish eiditng, Finish workout, Create */}
        <div className="flex gap-2 bg-cyan-300 absolute right-0 top-0">
          {selectExercisesError && (
            <div className="absolute top-0 right-0 -translate-y-[150%] text-nowrap z-9 bg-amber-500">Please add at least 1 exercise</div>
          )}

          {/* Only shows buttons when in "View" mode */}
          {(formMode == "View") && (
            <>
              <button className="border-2 border-green-400" type="button" onClick={()=>{setFormMode("Edit")}}>Edit Mode</button>
              <button className="border-2 border-green-400" type="button" onClick={()=>{setFormMode("Workout")}}>Start Workout</button>
            </>
          )}

          {/* Only shows buttons in "Edit" mode */}
          {formMode == "Edit" && (
            <>
              <button className="border-2 border-blue-400" type="button" onClick={()=>{cancelEditOrWorkoutMode()}}>Cancel Edits</button>
              <button className="border-2 border-blue-400">Submit Edit</button>
            </>
          )}

          {/* Only shows button in "Create" mode */}
          {formMode == "Create" && (
            <button className="border-2 border-gray-400">Create</button>
          )}

          {/* Only shows buttons in "Workout" mode */}
          {formMode == "Workout" && (
            <>
              <button className="border-2 border-gray-400" onClick={()=>{cancelEditOrWorkoutMode()}}>Cancel workout</button>
              <button className="border-2 border-gray-400">Submit workout</button>
            </>
          )}
        </div>
      </form>
    </CreateWorkoutContext.Provider>
  )
}
