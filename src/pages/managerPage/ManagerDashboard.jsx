import React from 'react';
import { FaCalendarAlt, FaMoneyBillWave, FaUsers, FaExclamationTriangle } from 'react-icons/fa';

const ManagerDashboard = () => {
    // Dummy data 
    const stats = [
        { title: "Today's Bookings", value: 5, icon: <FaCalendarAlt className="text-blue-500" /> },
        { title: "This Week's Revenue", value: "₹18,500", icon: <FaMoneyBillWave className="text-green-500" /> },
        { title: "Active Customers", value: 23, icon: <FaUsers className="text-purple-500" /> },
        { title: "Pending Issues", value: 1, icon: <FaExclamationTriangle className="text-red-500" /> }
    ];

    const recentBookings = [
        { id: 1, turf: "Football Turf", time: "10:00-12:00", customer: "Rahul S.", status: "confirmed" },
        { id: 2, turf: "Cricket Pitch", time: "14:00-16:00", customer: "Priya M.", status: "pending" },
        { id: 3, turf: "Badminton Court", time: "18:00-19:00", customer: "Amit K.", status: "confirmed" }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="mr-4 text-2xl">{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-xl font-semibold">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Turf</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map(booking => (
                                <tr key={booking.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{booking.turf}</td>
                                    <td className="px-4 py-3">{booking.time}</td>
                                    <td className="px-4 py-3">{booking.customer}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'confirmed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;