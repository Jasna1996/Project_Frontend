import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios/axiosInstance';

import { loadStripe } from '@stripe/stripe-js';
import { bookTurf, makePaymentOnStripe } from '../../services/userServices';
import { calculatePrice } from '../../utilities/priceUtils';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

function BookNow() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    turfId,
    turfName,
    date,
    timeFrom,
    timeTo,
    priceEstimate
  } = location.state || {};

  const [email, setEmail] = useState('');

  const handleBooking = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      const formatTimeForBackend = (timeStr) => {
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
        if (!timeRegex.test(timeStr)) {
          throw new Error(`Invalid time format: ${timeStr}`);
        }
        return timeStr;
      }

      const bookingData = {
        email,
        turfId,
        turfName,
        date,
        time_From: formatTimeForBackend(timeFrom),
        time_To: formatTimeForBackend(timeTo),
        priceEstimate

      };

      const bookingRes = await bookTurf(bookingData);
      const bookingId = bookingRes.data.bookingId;
      if (!bookingRes?.data?.success) {
        const errorMessage = bookingRes?.data?.message || "Booking failed";
        if (errorMessage.includes("already exists")) {
          toast.error("Booking already exists for this slot.");
        } else {
          toast.error(errorMessage);
        }
        return;
      }


      //from stripe

      const paymentBody = {
        bookings: [bookingData],
        price: priceEstimate || calculatePrice(timeFrom, timeTo, sport)

      }
      const response = await makePaymentOnStripe(paymentBody)
      console.log("Sent bookings:", paymentBody);

      console.log(response.data.sessionId, "stripe");

      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.log(result.error.message)
          toast.error("Payment failed. Please try again.");
        }

      }
      else {
        console.log("stripe failed to load")
        toast.error("Stripe payment could not be initialized.");
      }

    } catch (error) {
      console.error(error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message;
      if (status === 404 && message === "User not found") {
        toast.error("User not found. Please log in and try again.");
        navigate("/login");
        return;
      }
      toast.error(message || "An error occurred while booking.");
    }
  };

  if (!turfId || !turfName || !date || !timeFrom || !timeTo) {
    return <div className="p-6 text-red-500">Missing booking details. Please try again.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Booking</h2>

      <div className="mb-6">
        <p><strong>Turf:</strong> {turfName}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {timeFrom} - {timeTo}</p>

        <p><strong>Estimated Price:</strong> ₹{priceEstimate || 'N/A'}</p>

      </div>

      <div className="form-control mb-6">
        <label className="label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-full" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
}

export default BookNow;
