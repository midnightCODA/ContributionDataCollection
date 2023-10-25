import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { AddData, AdminDashboard, ChangePassword, Login, ManageUsers, ViewData, CreateUser } from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewData />,
  },
  {
    path: "/AddData",
    element: <AddData />,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/ManageUsers",
    element: <ManageUsers />,
  },

  {
    path: "/forgotpassword",
    element: <ChangePassword />,
  },

  {
    path: "/CreateUser",
    element: <CreateUser />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);