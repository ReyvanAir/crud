import { Routes, Route, Navigate } from 'react-router-dom';

import { Nav } from './components';
import {
  Login,
  SignUp,
  History,
  Leaderboard,
  User,
  UserDetail
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
            <Route path='/history' element={<History />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route path='/user' element={<User />} />
            <Route path='/user/detail/:id' element={<UserDetail />} />
            <Route path='*' element={<Navigate to='/user' />} />
          </Routes>
        </>
      )}
    </>
  );
};
