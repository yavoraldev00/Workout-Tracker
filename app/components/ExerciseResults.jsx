// "use client"

// // import { useContext, useEffect, useState } from "react";
// import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";

// // API call to get exercises
// export async function getExercises() {
//   const res = await fetch("http://localhost:4000/exercises")

//   return res.json();
// }

// export default function ExerciseResults() {
//     // const [results, setResults] = useState([])

//     // useEffect(() => {
//     //     getExercises().then((res) => {setResults(res)})
//     // },[])

//     // const { selectedExercises } = useContext(CreateWorkoutContext);

//     // const searchFilter = Object.keys(selectedExercises)


//   return (
//     <>
//         {
//             results.map(exercise => (
//                 <div>
//                     <div key={exr.exerciseId}
//                     onClick={() => {setAddNew(false); onExerciseSelect(exr)}}
//                     className="cursor-pointer flex w-full border-2 border-gray-400"
//                     >
                
//                       <Image
//                           src={"/exercise_img/"+exr.gifUrl}
//                           alt="none"
//                           width={100}
//                           height={100}/>

//                       <h3>{exr.name}</h3>

//                     </div>
//                 </div>
//             ))
//         }
//     </>
//   )
// }
