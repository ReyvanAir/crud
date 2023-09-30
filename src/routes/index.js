import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import User from "../pages/user";
import Score from "../pages/score";
import History from "../pages/history";
import Home from "../pages/home";
import Test from "../pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>This is root</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/score",
    element: <Score />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
