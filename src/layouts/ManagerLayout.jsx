import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaCalendarAlt, FaMoneyBillWave, FaSignOutAlt, FaFootballBall } from 'react-icons/fa';
import { toast } from 'react-toastify';


function ManagerLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate('/manager/login');
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-4 flex flex-col">
                <div className="mb-8 p-4 border-b border-blue-700">
                    <h1 className="text-xl font-bold">Turf Manager</h1>
                    <p className="text-sm text-blue-200">Welcome, {user?.name}</p>
                </div>

                <nav className="flex-1">
                    <Link to="/manager" className="flex items-center p-3 hover:bg-blue-700 rounded mb-2">
                        <FaHome className="mr-3" /> Dashboard
                    </Link>
                    <Link to="/manager/turfs" className="flex items-center p-3 hover:bg-blue-700 rounded mb-2">
                        <FaFootballBall className="mr-3" /> My Turfs
                    </Link>
                    <Link to="/manager/bookings" className="flex items-center p-3 hover:bg-blue-700 rounded mb-2">
                        <FaCalendarAlt className="mr-3" /> Bookings
                    </Link>
                    <Link to="/manager/payments" className="flex items-center p-3 hover:bg-blue-700 rounded mb-2">
                        <FaMoneyBillWave className="mr-3" /> Payments
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center p-3 hover:bg-blue-700 rounded"
                >
                    <FaSignOutAlt className="mr-3" /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );

}

export default ManagerLayout
