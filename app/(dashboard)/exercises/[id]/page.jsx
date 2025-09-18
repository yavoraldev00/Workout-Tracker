"use client"

import Exercises from "@/app/components/Exercises"

export default async function page({ params }) {
    const { id } = await params
  return (
    <Exercises searchFilter={id} />
  )
}
