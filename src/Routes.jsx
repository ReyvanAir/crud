import { Routes, Route, Navigate } from 'react-router-dom';

import { Nav } from './components';
import {
  Login,
  SignUp,
  Home,
  History,
  HistoryPlayerDetail,
  Leaderboard,
  User
} from './pages';



export default function _Routes() {
  const isLoggedIn = sessionStorage.getItem('user');



  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/history/player-detail' element={<HistoryPlayerDetail />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/User' element={<User />} />
            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
        </>
      )}
    </>
  );
};
