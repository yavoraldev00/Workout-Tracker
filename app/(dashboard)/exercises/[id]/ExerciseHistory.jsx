"use client"

import Image from "next/image"
import { useState } from "react"

export default function ExerciseHistory({ exercise_data, exercise_history }) {
  const [showHistory, setShowHistory] = useState(true)

  debugger;
  
  return (
    <div className="flex flex-col">
        <div className="flex">
          <button type="button" onClick={() => setShowHistory(false)}>Details</button>
          <button type="button" onClick={() => setShowHistory(true)}>History</button>
        </div>

      {/* Shows exercise details if on "Details" tab */}
      {!showHistory && (
        <div className="grid columns-2">
          <Image />
          <p></p>
        </div>
      )}

      {/* Shows exercise history if on "History" tab */}
      {((showHistory) && (exercise_history.length > 0)) && (
        <>
          <div>THIS IS WHERE THE CHART GOES</div>
          {
            exercise_history.map((exercise_record) => (
              <div key={exercise_record.id}>
                <div>Date: {exercise_record.created_at}</div>
                
                {exercise_record.volume.map((set_data, index) => (
                  <div key={index}>
                    <span>{set_data[0]} reps</span>
                    <span> X </span>
                    <span>{set_data[0]} kg</span>
                  </div>
                ))}

                <div>Max weight: {exercise_record.max_weight}</div>
                <div>Volume: {exercise_record.total_load}</div>
              </div>
            ))
          }
        </>
      )}

      {/* Shows message there is no history  if on "History" tab */}
      {((showHistory) && (exercise_history.length == 0)) && (
        <div>You have no history for this exercise! Add it to your workout to set new records</div>
      )}

    </div>
  )
}
