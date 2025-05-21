import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getManagerBookings } from '../../services/managerServices';

const ManagerBookings = () => {

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await getManagerBookings();
            setBookings(response.data.data)
        } catch (error) {
            toast.error("Failed to fetch bookings")
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Turf Bookings</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">Turf</th>
                            <th className="py-3 px-4 text-left">User</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Time Slot</th>
                            <th className="py-3 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{booking.turf_id?.name || 'N/A'}</td>
                                <td className="py-3 px-4">{booking.user_id?.name || 'N/A'}</td>
                                <td className="py-3 px-4">{formatDate(booking.bookingDate)}</td>
                                <td className="py-3 px-4">
                                    {formatTime(booking.time_From)} - {formatTime(booking.time_To)}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.booking_Status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                        }`}>
                                        {booking.booking_Status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default ManagerBookings