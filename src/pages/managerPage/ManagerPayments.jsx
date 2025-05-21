import React, { useEffect, useState } from 'react'
import { getManagerPayments } from '../../services/managerServices';

const ManagerPayments = () => {

    const [payments, setPayments] = useState([]);
    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await getManagerPayments();
            setPayments(response.data.data)
        } catch (error) {
            toast.error("Failed to fetch payments");
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Payment Records</h1>

            {payments.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <p>No payment records found</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Turf</th>
                                <th className="py-3 px-4 text-left">User Email</th>
                                <th className="py-3 px-4 text-left">Time Slot</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        {formatDate(payment.date)}
                                    </td>
                                    <td className="py-3 px-4">
                                        {payment.turf_name}
                                    </td>
                                    <td className="py-3 px-4">
                                        {payment.user_email}
                                    </td>
                                    <td className="py-3 px-4">
                                        {payment.time_slot}
                                    </td>
                                    <td className="py-3 px-4">
                                        ₹{payment.amount}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}

export default ManagerPayments
