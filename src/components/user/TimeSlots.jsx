import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatePrice } from '../../utilities/priceUtils';
import { toast } from 'react-toastify'

function TimeSlots({ turf, turfId, turfName, slots = [], bookedSlots = [] }) {
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [date, setDate] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.getHours() * 60 + now.getMinutes()); // total minutes
    }, []);


    const handleBookNow = () => {

        if (!date || !timeFrom || !timeTo || !selectedSport) {
            toast.warn("Please select a date, sport, and time slot.");
            return;
        }

        const estimatedPrice = calculatePrice(turf.pricePerHour, selectedSport, timeFrom, timeTo);

        const bookingData = {
            turfId,
            turfName,
            date,
            timeFrom,
            timeTo,
            priceEstimate: estimatedPrice,
            selectedSport,
        }
        const token = localStorage.getItem("userToken");
        if (!token) {
            toast.warn("Please login to continue");
            navigate("/login", { state: { from: "/booknow", data: bookingData } });
            return;
        }


        navigate('/booknow', {
            state: bookingData

        });
    };

    const handleReset = () => {
        setTimeFrom(null);
        setTimeTo(null);
        setDate('');
        setSelectedSport('');
    };

    const today = new Date().toISOString().split('T')[0];

    const isPastSlot = (slotTime) => {
        if (date !== today) return false;
        const [time, period] = slotTime.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes <= currentTime;
    };

    const isBooked = (slotTime) => {
        return bookedSlots.includes(slotTime);
    };

    return (
        <dialog id={`modal_${turfId}`} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-xl mb-4">Select Date, Sport & Time</h3>

                <div className="flex gap-4 mb-4">
                    {/* Date Picker */}
                    <div className="form-control">
                        <label className="label font-semibold">Date</label>
                        <input
                            type="date"
                            className="input input-bordered"
                            min={today}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Sport Dropdown */}
                    <div className="form-control">
                        <label className="label font-semibold">Sport</label>
                        <select
                            className="select select-bordered"
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                        >
                            <option disabled value="">Select Sport</option>
                            {Object.keys(turf?.pricePerHour || {}).map((sport) => (
                                <option key={sport} value={sport}>
                                    {sport.charAt(0).toUpperCase() + sport.slice(1)} - ₹{turf.pricePerHour[sport]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Time Slots */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {slots.map((slot, index) => {
                        const disabled = isPastSlot(slot) || isBooked(slot);
                        const selected = slot === timeFrom || slot === timeTo;

                        return (
                            <button
                                key={index}
                                disabled={disabled}
                                className={`btn ${disabled ? 'btn-disabled text-white ' + (isBooked(slot) ? 'bg-red-500' : 'bg-gray-400') : selected ? 'btn-success' : 'btn-outline btn-accent'}`}
                                onClick={() => {
                                    if (!timeFrom && !timeTo) {
                                        setTimeFrom(slot);
                                    } else if (timeFrom && !timeTo && slot !== timeFrom) {
                                        const [from, to] = [timeFrom, slot].sort((a, b) => {
                                            const parseTime = (t) => {
                                                const [time, period] = t.split(' ');
                                                let [hours, minutes] = time.split(':').map(Number);
                                                if (period === 'PM' && hours !== 12) hours += 12;
                                                if (period === 'AM' && hours === 12) hours = 0;
                                                return hours * 60 + minutes;
                                            };
                                            return parseTime(a) - parseTime(b);
                                        });
                                        setTimeFrom(from);
                                        setTimeTo(to);
                                    } else {
                                        setTimeFrom(slot);
                                        setTimeTo(null);
                                    }
                                }}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>

                <div className="text-sm mb-2">
                    <p><strong>Date:</strong> {date || 'Not selected'}</p>
                    <p><strong>From:</strong> {timeFrom || 'Not selected'}</p>
                    <p><strong>To:</strong> {timeTo || 'Not selected'}</p>
                    <p><strong>Sport:</strong> {selectedSport || 'Not selected'}</p>
                    {selectedSport && turf?.pricePerHour && (
                        <>
                            <p><strong>Price Per Hour:</strong> ₹{turf.pricePerHour[selectedSport]}</p>
                            {date && timeFrom && timeTo && (
                                <p><strong>Total Estimated Price:</strong> ₹{calculatePrice(turf.pricePerHour, selectedSport, timeFrom, timeTo)}</p>
                            )}
                        </>
                    )}
                </div>

                <div className="modal-action flex justify-between items-center">
                    <form method="dialog">
                        <button
                            className="btn"
                            onClick={() => document.getElementById(`modal_${turfId}`).close()}
                        >
                            Close
                        </button>
                    </form>
                    <div className="flex gap-2">
                        <button className="btn btn-warning" onClick={handleReset}>Reset</button>
                        <button
                            className="btn btn-success"
                            disabled={!date || !timeFrom || !timeTo || !selectedSport}
                            onClick={handleBookNow}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default TimeSlots;
