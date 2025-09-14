// import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchExercises() {
  return (
    <div className="flex flex-col bg-cyan-200">
        <div className="flex">
            <input type="text" name="search-query" id="search-query" placeholder="search exercises by name ( e.g 'Dumbbell')"></input>
            <IoSearch size={50} className="cursor-pointer"/>
        </div>



    </div>
  )
}
