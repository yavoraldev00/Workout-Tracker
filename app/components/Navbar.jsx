import Link from 'next/link'

// components
import UserDropdown from './UserDropdown'

export default function Navbar() {
  return (
    <div className="flex bg-green-600 p-8">
        <div className='flex gap-4'>
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Workouts</Link>
        </div>
        
        <div className="ml-auto relative">
          <UserDropdown />
        </div>
    </div>
  )
}