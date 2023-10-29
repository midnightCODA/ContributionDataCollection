import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { AddData, AdminDashboard, ChangePassword, Login, ManageUsers, ViewData, CreateUser, CreateType } from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewData />,
  },
  {
    path: "/adddata",
    element: <AddData />,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manageusers",
    element: <ManageUsers />,
  },

  {
    path: "/forgotpassword",
    element: <ChangePassword />,
  },

  {
    path: "/createuser",
    element: <CreateUser />,
  },

  {
    path: "/createtype",
    element: <CreateType />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);