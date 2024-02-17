import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';
import { useEffect } from 'react';


const Header = () => {
  const {isLoggedIn} = useAppContext();
  

  return (
    <div className='bg-blue-600 py-16'>
        <div className='container mx-auto flex justify-between'>
           <span className='text-2xl sm:text-3xl font-bold text-white'>
             <Link to='/'>MernHolyDays.com</Link>
           </span>
           <span >
            {isLoggedIn ? 
            (<div className='flex items-center gap-4'>
            <Link to='/my-bookings' className='text-white font-bold'>My Bookings</Link>
            <Link to='/my-hotels' className='text-white font-bold'>My Hotels</Link>
            <SignOutButton/>
            </div>)
              : (<Link to='/sign-in'
              className='flex items-center text-bold font-bold bg-white text-blue-600 px-3 py-1'
              >
                Sign In
              </Link>)
            }
           </span>
        </div>
    </div>
  )
}

export default Header