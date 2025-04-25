import React, { useState } from 'react'
import BookNow from '../../pages/userPage/BookNow';

function TimeSlots({ turfId, turfName, slots = [] }) {

    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [date, setDate] = useState('');

    const handleReset = () => {
        setTimeFrom(null);
        setTimeTo(null);
        setDate('');

    };

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    return (
        <>
            <dialog id={`modal_${turfId}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl mb-4">Select Date & Time</h3>
                    {/* Date Picker */}
                    <div className="form-control mb-4">
                        <label className="label font-semibold">Select Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full max-w-xs"
                            min={today}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    {/* Time Slots */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {slots.map((slot, index) => (
                            <button
                                key={index}
                                className={`btn ${slot === timeFrom || slot === timeTo ? 'btn-success' : 'btn-outline btn-accent'}`}
                                onClick={() => {
                                    if (!timeFrom && !timeTo) {
                                        setTimeFrom(slot);
                                    } else if (timeFrom && !timeTo && slot !== timeFrom) {
                                        // Sort the selected slots
                                        const [from, to] = [timeFrom, slot].sort((a, b) => {
                                            const parseTime = (t) => {
                                                const [time, period] = t.split(" ");
                                                let [hours, minutes] = time.split(":").map(Number);
                                                if (period === "PM" && hours !== 12) hours += 12;
                                                if (period === "AM" && hours === 12) hours = 0;
                                                return hours * 60 + minutes;
                                            };
                                            return parseTime(a) - parseTime(b);
                                        });

                                        setTimeFrom(from);
                                        setTimeTo(to);
                                    } else {
                                        // Reset on third click or same time clicked again
                                        setTimeFrom(slot);
                                        setTimeTo(null);
                                    }
                                }}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>

                    <div className="text-sm mb-2">
                        <p><strong>Date:</strong> {date || 'Not selected'}</p>
                        <p><strong>From:</strong> {timeFrom || 'Not selected'}</p>
                        <p><strong>To:</strong> {timeTo || 'Not selected'}</p>
                    </div>

                    <div className="modal-action flex justify-between items-center">
                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={() => {
                                    const modal = document.getElementById(`modal_${turfId}`);
                                    if (modal) modal.close();
                                }}
                            >
                                Close
                            </button>
                        </form>

                        <div className="flex gap-2">
                            <button className="btn btn-warning" onClick={handleReset}>
                                Reset
                            </button>
                            <button
                                className="btn btn-success"
                                disabled={!date || !timeFrom || !timeTo}
                                onClick={() => {
                                    alert(`Booking: ${date}, ${timeFrom} - ${timeTo}`);
                                }}
                            >
                                Book Now
                            </button>

                        </div>
                    </div>
                </div>
            </dialog>

        </>
    );
}

export default TimeSlots;
