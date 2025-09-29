"use client"

import { createClient } from "@supabase/supabase-js"
import ExerciseHistory from "./ExerciseHistory";
import { useEffect, useState } from "react";

// API call to get exercises
// export async function getExercises() {
//   const res = await fetch("http://localhost:4000/exercises")

//   return res.json();
// }

async function filterSingularExercise(exercise_id) {
  // const exercise_list = await getExercises()
  const res = await fetch(`${location.origin}/api/exercises`)
  const exercise_list = await res.json()
  
  // Find the exercise with the matching exerciseId
  const selected_exercise = exercise_list.find(
    (exercise) => exercise.exerciseId === exercise_id
  );
  
  return selected_exercise;
}

// Database call to retrieve workout history for user
// async function getExerciseHistory(exercise_id) {
    
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
//     )

//     const { data, error } = await supabase
//     .from("Exercises")
//     .select("*")
//     .eq("user", "me@gmail.com")
//     .eq("exercise_id", exercise_id)

//     if (error){
//       console.error("Error with", error);
//       return [];
//     }

//     return data;
// }

export default function page({ params }) {
  // const { id } = await params

  // const exercise_data = await filterSingularExercise(id)

  // const exercise_history = await getExerciseHistory(id)

  const [id, setId ] = useState("")

  const [exercise_data, setExercise_data] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const set_id = await params
      setId(set_id.id)

      const data = await filterSingularExercise(id);
      setExercise_data(data);
    }

    fetchData();
  }, [id]);

  return (
    <main>
      {exercise_data && (
        <>
          <h1 className="section-title">{`${exercise_data.name.charAt(0).toUpperCase()}${exercise_data.name.slice(1)}`}</h1>
          
          <div>
            <ExerciseHistory exercise_data = {exercise_data}/> {/* exercise_history = {exercise_history} */}
          </div>
        </>
      )}
    </main>
  )
}
