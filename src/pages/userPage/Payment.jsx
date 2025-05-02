import React from 'react'
import { useLocation } from 'react-router-dom'

function Payment() {
    const location = useLocation();
    const bookingData = location.state?.bookingData;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>

            {bookingData ? (
                <div>
                    <p><strong>Booking ID:</strong> {bookingData._id}</p>
                    <p><strong>Date:</strong> {new Date(bookingData.date).toLocaleDateString()}</p>
                    {/* Add payment gateway / amount etc */}
                </div>
            ) : (
                <p>No booking data available</p>
            )}
        </div>
    )
}

export default Payment
