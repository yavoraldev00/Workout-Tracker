"use client"

import { useEffect, useState } from "react"
import { getWorkouts } from "@/utils/supabase/client";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    getWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, []);
  return (
    <>
      {workouts.map((workout_plan) => (
        <div key={workout_plan.id}>
          <h1>{workout_plan.workout.name}</h1>
        </div>
      ))}
    </>
  )
}