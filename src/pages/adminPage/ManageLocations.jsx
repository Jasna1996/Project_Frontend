import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/axiosInstance';
import { addLocations, editLocation, deleteLocation } from '../../services/adminService';
import { toast, ToastContainer } from 'react-toastify';


function ManageLocations() {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pincode: '',
        status: 'active',
    });
    const [editId, setEditId] = useState(null);

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/admin/GetAllLocations');
            console.log('Fetched data:', res.data);
            setLocations(res.data.data);

        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchLocations();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "pincode" ? Number(value) : value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await editLocation(editId, formData)
                toast.success('Location updated successfully!');
            } else {
                await addLocations(formData);
                toast.success('Location added successfully!');
            }
            setFormData({ name: '', address: '', pincode: '', status: 'active' })
            setEditId(null);
            fetchLocations();
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to save location!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this location?')) {
            try {
                await deleteLocation(id);
                toast.success('Location deleted successfully!');
                fetchLocations();
            } catch (error) {
                console.error('Delete error:', error);
                toast.error('Failed to delete location!');
            }
        }
    };

    const handleEdit = (loc) => {
        setFormData({
            name: loc.name,
            address: loc.address,
            pincode: loc.pincode,
            status: loc.status,
        })
        setEditId(loc._id);
    };

    return (<div className="flex flex-col md:flex-row p-6 gap-8">
        {/* Left - Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">
                {editId ? "Update" : "Add"} Location
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Location Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editId ? "Update" : "Add"} Location
                </button>
            </form>
        </div>

        {/* Right - List */}
        <div className="md:w-1/2">
            <h2 className="text-xl font-bold mb-4">All Locations</h2>
            {loading ? (
                <div className="flex justify-center items-center h-40 space-x-2">
                    <span className="loading loading-dots loading-xs"></span>
                    <span className="loading loading-dots loading-sm"></span>
                    <span className="loading loading-dots loading-md"></span>
                    <span className="loading loading-dots loading-lg"></span>
                    <span className="loading loading-dots loading-xl"></span>
                </div>
            ) : (
                <div className="space-y-4">
                    {locations.map((loc) => (
                        <div
                            key={loc._id}
                            className="p-4 border rounded-md bg-gray-100 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">{loc.name}</h3>
                                <p className="text-sm">{loc.address}</p>
                                <p className="text-sm text-gray-600">Pincode: {loc.pincode}</p>
                                <p
                                    className={`text-sm font-medium ${loc.status === "active" ? "text-green-700" : "text-red-600"
                                        }`}
                                >
                                    Status: {loc.status}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(loc)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(loc._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
}

export default ManageLocations
