import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function ExerciseItem({ onExerciseSelect, setAddNew, visible}) {
    // Checks if the component has a function attached (called from CreateForm / workout[id] page)
    const hasFunction = (!(onExerciseSelect == undefined))

  return (
    <>
        {hasFunction &&(
        <button onClick={(e)=>{e.preventDefault(); setAddNew(false)}} className="absolute top-0 right-0 p-4 cursor-pointer">
          < IoClose size={24} color="white" className="bg-red-600"/>
        </button>
        )}

        {visible.map(exr => (
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
        ))}
    </>
  )
}
