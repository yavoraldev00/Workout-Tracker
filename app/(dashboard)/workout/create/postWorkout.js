"use client"

import { createClient } from "@supabase/supabase-js"

export default async function postWorkout(workoutJson, method) {
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    if(method == "INSERT"){
        // Upload new workout
        const { data, error } = await supabase
        .from("Workouts")
        .insert([
            {
            user: workoutJson.user_email,
            workout: workoutJson.workout
            }
        ])
        .select()

        if (error) {
            console.error("Insert error:", error)
        } else {
            console.log("Workout saved:", data)
        }
    }else if(method == "UPDATE"){
        // Update workout
        const { data, error } = await supabase
        .from("Workouts")
        .update({
            user: workoutJson.user_email,
            workout: workoutJson.workout
        })
        .eq("id", workoutJson.id)
        .select()

        if (error) {
            console.error("Update error:", error)
        } else {
            console.log("Workout updated:", data)
        }
    }
}