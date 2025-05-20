import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import { getBookings } from '../../services/userServices';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchBookings = async () => {
            try {

                const response = await getBookings(userId);
                console.log(response)
                if (response.data.success) {
                    if (response.data.bookings.length === 0) {
                        setError("No bookings found.");
                    } else {
                        setBookings(response.data.bookings);
                    }
                } else {
                    setError(response.data.message || 'Failed to load bookings.');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBookings();
        } else {
            setError("User not logged in.");
            setLoading(false);
        }
    }, [userId]);


    const cancelBooking = async (bookingId) => {
        try {
            const response = await axiosInstance.delete(`/user/cancelBooking/${bookingId}`);
            if (response.data.success) {
                setBookings(prev => prev.filter(b => b._id !== bookingId));
                alert("Booking cancelled successfully");
            } else {
                alert(response.data.message || "Failed to cancel booking.");
            }
        } catch (error) {
            console.error("Cancel booking error:", error);
            alert("Something went wrong while cancelling the booking.");
        }
    };

    if (loading) return <div className="p-6">Loading bookings...</div>;
    if (error) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                {error === "No bookings found." && (
                    <button
                        onClick={() => window.location.href = "/turfs"}
                        className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
                    >
                        Book Turf
                    </button>
                )}
            </div>
        );
    }
    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings for you.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <p><strong>Turf:</strong> {booking.turf_id?.name || "Unknown Turf"}</p>
                                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {formatTime(booking.time_From)} - {formatTime(booking.time_To)}</p>
                            </div>
                            <button
                                onClick={() => cancelBooking(booking._id)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Bookings;
