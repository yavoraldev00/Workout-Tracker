"use client"

import Link from "next/link";
import CreateNewWorkout from "../components/CreateNewWorkout";
import { useUser } from "./UserProvider";

// Database call to retrieve ALL workouts
// async function getWorkouts() {
    
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
//     )

//     const { data, error } = await supabase
//     .from("Workouts")
//     .select("*")
//     .eq("user", "me@gmail.com")

//     if (error){
//       console.error("Error with", error);
//       return [];
//     }

//     return data;
// }

export default function Workouts() {
  const { workouts } = useUser(); // 👈 Access email from context
  // const [workouts, setWorkouts] = useState([]);

  // useEffect(() => {
  //   async function fetchWorkouts() {
  //     const supabase = createClient(
  //       process.env.NEXT_PUBLIC_SUPABASE_URL,
  //       process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  //     );

  //     const { data, error } = await supabase
  //       .from("Workouts")
  //       .select("*")
  //       .eq("user", userEmail); // 👈 Use dynamic email

  //     if (error) {
  //       console.error("Error fetching workouts:", error);
  //       return;
  //     }

  //     setWorkouts(data); // 👈 Update state
  //   }

  //   if (userEmail) {
  //     fetchWorkouts();
  //   }
  // }, [userEmail]); // 👈 Re-run when email changes

  return (
    <>
      {
        workouts.map(workout => (
          <Link key={workout.id} href={`/workout/${workout.id}`}>
            <div className="workout-card">
              <h3 className="text-3xl mb-2">{workout.workout.name}</h3>
              <div>Number of exercises: {Object.keys(workout.workout.exercises).length}</div>
            </div>
          </Link>
        ))
      }
      <CreateNewWorkout />
    </>
  )
}