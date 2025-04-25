import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/userPage/HomePage";
import About from "../pages/userPage/About";
import ContactUs from "../pages/userPage/ContactUs"
import Turfs from "../pages/userPage/Turfs"
import Bookings from "../pages/userPage/Bookings"
import Login from "../pages/shared/Login";
import Signup from "../pages/shared/Signup"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <h2>Error page</h2>,

    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contactUs",
        element: <ContactUs />
      },
      {
        path: "turfs",
        element: <Turfs />
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
    ]
  },

]);