import Link from 'next/link'

// components
import UserDropdown from './UserDropdown'

export default function Navbar() {
  return (
    <div className="flex bg-green-600 p-8">
        <div className='flex gap-6'>
            <Link href={"/"} className='bg-gray-500 p-4'>Home</Link>
            <Link href={"/"} className='bg-gray-500 p-4'>Workouts</Link>
        </div>
        
        <div className="ml-auto bg-blue-400 relative">
          <UserDropdown />
        </div>
    </div>
  )
}