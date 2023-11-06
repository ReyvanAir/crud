import { Routes, Route, Navigate } from "react-router-dom";

import { Nav, NavUser } from "./components";
import {
  Landing,
  Login,
  SignUp,
  History,
  Leaderboard,
  User,
  UserDetail,
} from "./pages";
import LoginUser from "./pages/LoginUser";

export default function _Routes() {
  const isLoggedIn = JSON.parse(sessionStorage.getItem("user"));

  console.log(isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/landing" />} />
        </Routes>
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path="/history" element={<History />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/user/detail/:id" element={<UserDetail />} />
            <Route
              path="*"
              element={
                <Navigate
                  to={isLoggedIn.role === "ADMIN" ? "/user" : "/leaderboard"}
                />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}
