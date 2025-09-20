import { useContext } from "react";
import { CreateWorkoutContext } from "../(dashboard)/workout/create/CreateWorkout";

export default function ExerciseItemz() {

    const {} = useContext(CreateWorkoutContext)
  return (
    <>
        {
            (hasFunction) ?
                <div key={exr.exerciseId}
                    onClick={() => {setAddNew(false); onExerciseSelect(exr)}}
                    className="cursor-pointer flex w-full border-2 border-gray-400"
                >
                
                    <Image
                        src={"/exercise_img/"+exr.gifUrl}
                        alt="none"
                        width={100}
                        height={100}/>

                    <h3>{exr.name}</h3>
                </div>
                :
                <Link key={exr.exerciseId} href={`/exercises/${exr.exerciseId}`}>
                    <div
                    onClick={() => {setAddNew(false); onExerciseSelect(exr)}}
                    className="cursor-pointer flex w-full border-2 border-gray-400"
                    >
                        <Image
                            src={"/exercise_img/"+exr.gifUrl}
                            alt="none"
                            width={100}
                            height={100}/>

                        <h3>{exr.name}</h3>
                    </div>
                </Link>
        }
    </>
  )
}
