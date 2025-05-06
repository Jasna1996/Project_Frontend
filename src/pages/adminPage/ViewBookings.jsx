import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBookings } from '../../services/adminService';

function ViewBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await getAllBookings()
                console.log("Bookings API response:", res.data);
                setBookings(res.data.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            }
        };
        fetchBookings();
    }, []);
    const formatDate = (iso) => new Date(iso).toLocaleDateString();
    const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">User Email</th>
                            <th className="p-2 border">Turf Name</th>
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Time</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="p-2 border">{booking.user_id?.email || "N/A"}</td>
                                <td className="p-2 border">{booking.turf_id?.name || "N/A"}</td>
                                <td className="p-2 border">{formatDate(booking.date)}</td>
                                <td className="p-2 border">{formatTime(booking.time_From)} - {formatTime(booking.time_To)}</td>
                                <td className="p-2 border">{booking.booking_Status}</td>
                                <td className="p-2 border">₹{booking.total_Amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewBookings;

