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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    loader: ()=>fetch('http://localhost:3000/alltask')
  },
  {
    path: "/update/:id",
    element: <UpdateTask></UpdateTask>,
    loader: ({params}) => fetch(`http://localhost:3000/alltask/${params.id}`) 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);