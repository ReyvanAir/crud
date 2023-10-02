import { Menu } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ProfilePicturePlaceholder } from '../../assets/images';



export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(sessionStorage.getItem('user'));

  const [expandNav, setExpandNav] = useState(true);



  function handleLogout() {
    sessionStorage.removeItem('user');
    window.location.reload();
  }



  return (
    <nav className={`bg-secondary flex flex-col ${expandNav ? 'w-[20vw]' : '' }`}>
      <Button
        variant='outlined'
        size='small'
        onClick={() => setExpandNav(!expandNav)}
      >
        <Menu />
      </Button>

      <div className={`flex-1 ${expandNav ? 'flex' : 'hidden'} flex-col justify-between py-8 px-4`}>
        <div className='flex flex-col items-center gap-2'>
          <img
            src={ProfilePicturePlaceholder}
            alt='profile'
            className='rounded-full h-32 w-32'
          />
          <div className='font-bold text-lg'>{user.displayName}</div>
          <div className='font-bold'>ADMIN</div> {/* dpe value for admin qt nd tau m ambe drmna */}
        </div>

        <div className='flex flex-col gap-2'>
          <Button
            variant='contained'
            className='w-full'
            onClick={() => navigate('/user')}
            disabled={location.pathname.includes('/user')}
          >
            User
          </Button>
          <Button
            variant='contained'
            className='w-full'
            onClick={() => navigate('/leaderboard')}
            disabled={location.pathname.includes('/leaderboard')}
          >
            Leaderboard
          </Button>
          <Button
            variant='contained'
            className='w-full'
            onClick={() => navigate('/history')}
            disabled={location.pathname.includes('/history')}
          >
            History
          </Button>
        </div>

        <Button
          variant='contained'
          className='w-full'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};
