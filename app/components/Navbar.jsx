import Link from 'next/link'

// components
import UserDropdown from './UserDropdown'

export default function Navbar() {
  return (
    <div className="navbar">
        <div className='flex'>
            <Link href={"/"} className='p-4 text-white text-lg font-semibold rounded-2xl'>Home</Link>
            <Link href={"/exercises"} className='p-4 text-white text-lg font-semibold rounded-2xl'>Exercises</Link>
        </div>
        
        <div className="ml-auto relative">
          <UserDropdown />
        </div>
    </div>
  )
}