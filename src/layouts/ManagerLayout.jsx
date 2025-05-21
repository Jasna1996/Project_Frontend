import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaMoneyBillWave, FaSignOutAlt, FaFootballBall } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userLogout } from '../services/userServices';
import { persistor } from '../redux/store';
import { clearUser } from '../redux/features/userSlice';


function ManagerLayout() {
    const userData = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            userLogout().then(() => {
                persistor.purge();
                dispatch(clearUser())
                toast.success("Logged out successfully");
                navigate("/manager/login");
            })
        } catch (error) {
            console.log(error)
        }

    }
    const isLoggedIn = userData?.user && Object.keys(userData.user).length > 0;
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-4 flex flex-col">
                <div className="mb-8 p-4 border-b border-blue-700">
                    <h1 className="text-xl font-bold">Turf Manager</h1>
                    {isLoggedIn ? (
                        <div className="flex items-center mt-2">
                            <FaUser className="mr-2 text-blue-200" />
                            <p className="text-sm text-blue-200">Welcome, {user.name}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-blue-200">Please login</p>
                    )}
                </div>

                {isLoggedIn ? (
                    <>
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
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <Link
                            to="/manager/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Login as Manager
                        </Link>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {isLoggedIn ? (
                    <Outlet />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">Manager Portal</h2>
                            <p className="mb-4">Please login to access the manager dashboard</p>
                            <Link
                                to="/manager/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManagerLayout
