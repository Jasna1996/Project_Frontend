import React, { useEffect, useRef, useState } from 'react'
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
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

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isLoggedIn = userData?.user && Object.keys(userData.user).length > 0;

    return (
        <div className="navbar bg-gradient-to-r from-green-600 via-green-400 to-lime-300  shadow-md px-4 text-white ">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-white">
                    PlayNest
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-end items-center text-base font-bold">
                <ul className="flex space-x-6 list-none m-0 p-0">
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("")}>Home</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/managelocations")}>Locations</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/manageturf")}>Turfs</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/managers")}>Managers</li>
                    <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/admin/viewbookings")}>View Bookings</li>

                    {!isLoggedIn && (
                        <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/login")}>
                            Login
                        </li>
                    )}
                </ul>

                {isLoggedIn && (
                    <div className="relative ml-4" ref={dropdownRef}>
                        <div
                            className="cursor-pointer flex items-center"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="avatar">
                                <div className="w-8 rounded-full shadow-md border border-white">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="User Avatar"
                                    />
                                </div>
                            </div>
                        </div>

                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        navigate('/changePassword');
                                    }}
                                >
                                    Change Password
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                )}

            </div >

            {/* Mobile dropdown */}
            <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>

                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-500 text-white rounded-box w-60">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/admin/managelocations")}>Locations</li>
                    <li onClick={() => navigate("/admin/manageturf")}>Turfs</li>
                    <li onClick={() => navigate("/admin/managers")}>Managers</li>
                    <li onClick={() => navigate("/admin/viewbookings")}>View Bookings</li>

                    {isLoggedIn ? (
                        <>
                            <li className="flex items-center space-x-2 px-2 py-1 border-t border-white mt-1">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="User"
                                    className="w-6 h-6 rounded-full border border-white"
                                />
                                <span>{userData.user.name}</span>
                            </li>
                            <li onClick={() => navigate("/changePassword")}>Change Password</li>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <li onClick={() => navigate("/login")}>Login</li>
                    )}
                </ul>
            </div>

        </div >
    );
}

export default AdminHeader
