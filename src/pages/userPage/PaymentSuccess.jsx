import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
                Thank you for your booking. We’ve received your payment and will confirm your booking shortly.
            </p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                Go to Home
            </button>
        </div>
    );
}

export default PaymentSuccess;
