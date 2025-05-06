import React from 'react';

function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Example Cards */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                        <p className="text-2xl font-bold text-blue-600">120</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
                        <p className="text-2xl font-bold text-green-600">305</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-xl font-semibold mb-2">Revenue</h2>
                        <p className="text-2xl font-bold text-amber-600">₹75,000</p>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default AdminDashboard;
