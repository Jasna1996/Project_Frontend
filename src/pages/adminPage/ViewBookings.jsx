import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBookings } from '../../services/adminService';

function ViewBookings() {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const bookingsPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const res = await getAllBookings()
                console.log("Bookings API response:", res.data);
                setBookings(res.data.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);
    const formatDate = (iso) => new Date(iso).toLocaleDateString();
    const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    // Pagination logic
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">All Bookings</h2>
            {loading ? (
                <div className="flex justify-center items-center py-10 space-x-2">
                    <span className="loading loading-dots loading-xs"></span>
                    <span className="loading loading-dots loading-sm"></span>
                    <span className="loading loading-dots loading-md"></span>
                    <span className="loading loading-dots loading-lg"></span>
                    <span className="loading loading-dots loading-xl"></span>
                </div>
            ) : (
                <>
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
                                {currentBookings.map((booking) => (
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
                    {/* Pagination controls */}
                    <div className="mt-4 flex justify-center">
                        <div className="join">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <input
                                    key={index + 1}
                                    type="radio"
                                    className="join-item btn btn-square"
                                    name="pagination"
                                    aria-label={`${index + 1}`}
                                    checked={currentPage === index + 1}
                                    onChange={() => setCurrentPage(index + 1)}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>

    );
}

export default ViewBookings;

