import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/userPage/HomePage";
import About from "../pages/userPage/About";
import ContactUs from "../pages/userPage/ContactUs"
import Turfs from "../pages/userPage/Turfs"
import Bookings from "../pages/userPage/Bookings"
import Login from "../pages/shared/Login";
import Signup from "../pages/shared/Signup"
import BookNow from "../pages/userPage/BookNow";
import Payment from "../pages/userPage/Payment";
import PaymentSuccess from "../pages/userPage/PaymentSuccess";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/adminPage/AdminDashbard";

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
      {
        path: "booknow",
        element: <BookNow />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: 'payment/success',
        element: <PaymentSuccess />
      },

    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>Error page</h2>,

    children: [
      {
        path: "login",
        element: <Login role="admin" />
      },
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
    ]
  }

]);