"use client"

import { createClient } from "@supabase/supabase-js"

export default async function postWorkout(workoutJson) {
    debugger;
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    )

    // Upload new workout
    // const { data, error } = await supabase
    // .from("Workouts")
    // .insert([
    //     {
    //     user: workoutJson.user_email,
    //     workout: workoutJson.workout
    //     }
    // ])

    // Update workout
    const { data, error } = await supabase
    .from("Workouts")
    .update({
        user: workoutJson.user_email,
        workout: workoutJson.workout
    })
    .eq("id", workoutJson.id);

    if (error) {
    console.error("Insert error:", error)
    debugger;
    } else {
    console.log("Workout saved:", data)
    debugger;
    }
}