import { createClient } from "@supabase/supabase-js"
import ExerciseHistory from "./ExerciseHistory";

// API call to get exercises
export async function getExercises() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}

async function filterSingularExercise(exercise_id) {
  const exercise_list = await getExercises()
  
  // Find the exercise with the matching exerciseId
  const selected_exercise = exercise_list.find(
    (exercise) => exercise.exerciseId === exercise_id
  );
  
  debugger;
  return selected_exercise;
}

// Database call to retrieve workout history for user
async function getExerciseHistory(exercise_id) {
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    const { data, error } = await supabase
    .from("Exercises")
    .select("*")
    .eq("user", "me@gmail.com")
    .eq("exercise_id", exercise_id)

    if (error){
      console.error("Error with", error);
      return [];
    }

    return data;
}

export default async function page({ params }) {
  const { id } = await params

  const exercise_data = await filterSingularExercise(id)

  const exercise_history = await getExerciseHistory(id)

  return (
    <main>
      <div>Exercise {id}</div>
      <div>
      {/* {
        Object.keys(exercise_data).map((key) => (
          <div>{exercise_data[key]}</div>
        ))
      } */}
      <ExerciseHistory exercise_data = {exercise_data} exercise_history = {exercise_history} />
      </div>
    </main>
  )
}
