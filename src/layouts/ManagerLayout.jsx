import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userLogout } from '../services/userServices';
import { persistor } from '../redux/store';
import { clearUser } from '../redux/features/userSlice';

function ManagerLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await userLogout();
            await persistor.purge();
            dispatch(clearUser());
            toast.success("Logged out successfully");
            navigate("/manager/login");
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-900">Manager Portal</h2>
                    <p className="mb-4 text-gray-700">Please login to access the manager dashboard</p>
                    <NavLink to="/manager/login" className="bg-lime-400 hover:bg-lime-500 text-black py-2 px-4 rounded">
                        Go to Login
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen relative">
            {/* Sidebar */}
            <div className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-green-900 text-white transform transition-transform duration-300 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="text-2xl font-bold p-4 border-b border-green-700 text-center flex justify-between items-center md:justify-center">
                    Manager Dashboard
                    <button onClick={toggleSidebar} className="md:hidden text-xl">
                        <FaTimes />
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-2">
                    <NavLink
                        to="/manager"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded ${isActive ? "bg-green-800" : "hover:bg-green-800"}`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaHome className="mr-3" /> Dashboard
                    </NavLink>
                    <NavLink
                        to="/manager/bookings"
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded ${isActive ? "bg-green-800" : "hover:bg-green-800"}`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <FaCalendarAlt className="mr-3" /> Bookings
                    </NavLink>
                </nav>
                <div className="p-4 border-t border-green-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 rounded hover:bg-green-800"
                    >
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Overlay for small screens */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 min-h-screen">
                {/* Topbar */}
                <div className="flex items-center justify-between md:hidden bg-white p-4 border-b shadow-sm sticky top-0 z-10">
                    <button onClick={toggleSidebar} className="text-2xl text-green-900">
                        <FaBars />
                    </button>
                    <h1 className="text-lg font-semibold text-green-900">Manager Panel</h1>
                    <div></div>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ManagerLayout;
