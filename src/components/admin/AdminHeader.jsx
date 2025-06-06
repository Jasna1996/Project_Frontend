import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from '../../services/userServices';
import { persistor } from '../../redux/store';
import { clearUser } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';

function AdminHeader() {
    const userData = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        try {
            userLogout().then(() => {
                persistor.purge();
                dispatch(clearUser())
                toast.success("Logged out successfully");
                navigate("/");
            })
        } catch (error) {
            console.log(error)
        }
    }
    const isLoggedIn = userData?.user && Object.keys(userData.user).length > 0;

    return (
        <div className="navbar bg-gradient-to-r from-green-600 via-green-400 to-lime-300  shadow-md px-4 text-white ">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-white">
                    PlayNest
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-end">
                <ul className="flex space-x-6 items-center text-base font-bold flex-nowrap">
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("")}>Home</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/managelocations")}>Locations</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/manageturf")}>Turfs</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/managers")}>Managers</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/viewbookings")}>View Bookings</li>
                    <li className="cursor-pointer" onClick={() => navigate("/login")}>Logout</li>

                </ul>
            </div>

            {/* Mobile dropdown */}
            <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-500  text-white rounded-box w-52">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/turfs">Turfs</Link></li>
                    <li><Link to="/bookings">Bookings</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li>{userData.user.name}</li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default AdminHeader
