"use client"

import Exercises, { getExercises } from "@/app/components/Exercises"

export default async function page({ params }) {
    const { id } = await params

    const data = await getExercises()

    // debugger
  return (
    <Exercises searchFilter={id} />
  )
}
