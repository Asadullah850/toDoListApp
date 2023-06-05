import React from 'react'
import App from './App.jsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UpdateTask from './Pages/UpdateTask.jsx';
import Home from './Pages/Home.jsx';
import AuthProvider from './Pages/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    loader: ()=>fetch('https://task-management-server-lilac-one.vercel.app/alltask')
  },
  {
    path: "/update/:id",
    element: <UpdateTask></UpdateTask>,
    loader: ({params}) => fetch(`https://task-management-server-lilac-one.vercel.app/alltask/${params.id}`) 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);