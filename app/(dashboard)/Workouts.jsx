import { createClient } from "@supabase/supabase-js"
import Link from "next/link";
import CreateNewWorkout from "../components/CreateNewWorkout";

// Database call to retrieve ALL workouts
async function getWorkouts() {
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    const { data, error } = await supabase
    .from("Workouts")
    .select("*")
    .eq("user", "me@gmail.com")

    if (error){
      console.error("Error with", error);
      return [];
    }

    return data;
}

export default async function Workouts() {
  const workouts = await getWorkouts()

  return (
    <>
      {
        workouts.map(workout => (
          <Link href={`/workout/${workout.id}`}>
            <div key={workout.id} className="workout-card">
              <h3>{workout.workout.name}</h3>
            </div>
          </Link>
        ))
      }
      <CreateNewWorkout />
    </>
  )
}