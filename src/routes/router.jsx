import {createBrowserRouter  } from "react-router-dom";
import HomePage                from "../pages/userPage/HomePage";
import UserLayout              from "../layouts/UserLayout";
import About                   from "../pages/userPage/About";
import Turfs                   from "../pages/userPage/Turfs";
import Login                   from "../pages/shared/Login";
import Bookings                from "../pages/userPage/Booking";
import Signup                  from "../pages/shared/Signup";
import ContactUs               from "../pages/userPage/ContactUs";





export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout/>,
      errorElement:<h2>Error page</h2>,

      children:[
        {
          path:"",
          element:<HomePage/>
        },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contactUs",
        element:<ContactUs/>
      },
      {
        path:"turfs",
        element:<Turfs/>
      },
      {
        path:"bookings",
        element:<Bookings/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      ]
    },

  ]);