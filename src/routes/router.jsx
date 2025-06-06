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
import ManageLocations from "../pages/adminPage/ManageLocations";
import ManageManagers from "../pages/adminPage/ManageManagers";
import ManageTurfs from "../pages/adminPage/ManageTurfs";
import ViewBookings from '../pages/adminPage/ViewBookings';
import ManagerLayout from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/managerPage/ManagerDashboard";
import ManageTurf from "../pages/managerPage/ManageTurf";
import ManagerBookings from "../pages/managerPage/ManagerBookings";
import ManagerPayments from "../pages/managerPage/ManagerPayments";
import ChangePassword from "../pages/shared/ChangePassword";


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
      {
        path: 'changepassword',
        element: <ChangePassword role="user" />
      }

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
        path: "",
        element: <HomePage />
      },

      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: "managelocations",
        element: <ManageLocations />
      },
      {
        path: "managers",
        element: <ManageManagers />
      },
      {
        path: "manageturf",
        element: <ManageTurfs />
      },
      {
        path: "viewbookings",
        element: <ViewBookings />
      },
      {
        path: "changepassword", element: <ChangePassword role="admin" />
      }

    ]
  },
  {
    path: "/manager",
    element: <ManagerLayout />,
    errorElement: <h2>Error page</h2>,
    children: [
      { path: "login", element: <Login role="manager" /> },
      { path: "", element: <ManagerDashboard /> },
      { path: "dashboard", element: <ManagerDashboard /> },
      { path: "turfs", element: <ManageTurf /> },
      { path: "bookings", element: <ManagerBookings /> },
      { path: "payments", element: <ManagerPayments /> },
      { path: "changepassword", element: <ChangePassword role="manager" /> }
    ]
  }

]);