"use client"

import { createClient } from "@supabase/supabase-js"

export default async function postExercises(exercise_id, user, volume, max_weight, total_load) {
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    // Upload new exercise data
    const { data, error } = await supabase
    .from("Exercises")
    .insert([
        {
        exercise_id: exercise_id,
        user: user,
        volume: volume,
        max_weight: max_weight,
        total_load: total_load
        }
    ])
    .select()

    if (error) {
    console.error("Insert error:", error)
    } else {
    console.log("Exercise saved:", data)
    }
}