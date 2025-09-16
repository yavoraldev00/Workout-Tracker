// import CreateWorkout from "./workout/create/CreateWorkout";

// // Database call to retrieve workout by ID
// export async function getSpecificWorkout(workout_id) {
    
//     const supabase = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
//     )

//     const { data, error } = await supabase
//     .from("Workouts")
//     .select("*")
//     .eq("id", id)
//     .single();

//     if (error){
//       console.error("Error with", error);
//       return [];
//     }

//     return data;
// }

// export default function GetSpecificWorkout() {
//     const workout = await 
//   return (
//     <CreateWorkout test = { selectedWorkout }/>
//   )
// }
