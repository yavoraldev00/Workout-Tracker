import Link from "next/link"
import { IoAdd } from "react-icons/io5"

export default function CreateNewWorkout() {
  return (
    <Link href={"/workout/create"}>
      <button className="p-8 my-4 border-2 border-gray-400 rounded-xl cursor-pointer bg-gray-300">
          < IoAdd size={50}/>
      </button>
    </Link>
  )
}