import { createClient } from "@supabase/supabase-js";
import CreateWorkout from "../create/CreateWorkout";

// Database call to retrieve workout by ID
export async function getSpecificWorkout(workout_id) {
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    const { data, error } = await supabase
    .from("Workouts")
    .select("*")
    .eq("id", workout_id)
    .single();

    if (error){
      console.error("Error with", error);
      return [];
    }

    return data;
}

export default async function page({ params }) {
  const { id } = await params

  const selectedWorkoutTemplate = await getSpecificWorkout(id)

  return (
    <>
      <h1 className="section-title">{selectedWorkoutTemplate.workout.name}</h1>

      <main>
        <CreateWorkout selectedWorkoutTemplate = {selectedWorkoutTemplate} />
      </main>
    </>
  )
}