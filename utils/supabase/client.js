import { createClient } from "@supabase/supabase-js"

export async function getWorkouts() {
    
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    const { data, error } = await supabase
    .from("Workouts")
    .select("*")

    if (error){
      console.error("Error with", error);
      return [];
    }

    return data;
}