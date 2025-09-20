// "use client"

// API call to get exercises
export async function getExercises() {
  const res = await fetch("http://localhost:4000/exercises")

  return res.json();
}

async function filterSingularExercise(exercise_id) {
  const exercise_list = await getExercises()
  
  // Find the exercise with the matching exerciseId
  const selected_exercise = exercise_list.find(
    (exercise) => exercise.exerciseId === exercise_id
  );
  
  debugger;
  return selected_exercise;
}

export default async function page({ params }) {
  const { id } = await params

  const exercise_data = await filterSingularExercise(id)

  return (
    <div>
      <div>Exercise {id}</div>
      <div>
      {
        Object.keys(exercise_data).map((key) => (
          <div>{exercise_data[key]}</div>
        ))
      }
      </div>
    </div>
  )
}
