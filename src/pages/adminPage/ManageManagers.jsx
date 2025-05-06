import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addManager, deleteManager, editManager, GetAllManagers, getAllUsers } from '../../services/adminService';
import { toast } from "react-toastify";
import { listLocations } from '../../services/userServices';

function ManageManagers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [managers, setManagers] = useState([]);
    const [editingManagerId, setEditingManagerId] = useState(null);


    const fetchManagers = async () => {
        try {
            const response = await GetAllManagers();
            if (response.data.success) {
                setManagers(response.data.data);
            } else {
                toast.error("Failed to fetch managers");
            }

        } catch (error) {
            console.error('Error fetching managers:', error);
            toast.error("Something went wrong fetching managers");
        }
    };

    useEffect(() => {
        // Fetch users
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                console.log("Fetched users:", response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else if (Array.isArray(response.data.users)) {
                    setUsers(response.data.users);
                } else {
                    setUsers([]);
                    toast.error("Unexpected user data format");
                }

            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        // Fetch locations
        const fetchLocations = async () => {
            try {
                const response = await listLocations();
                if (response.data.success) {
                    setLocations(response.data.data);
                } else {
                    console.log('Unexpected format in listLocations response:', response.data);
                }
            } catch (error) {
                console.error("Error fetching locations", error);
            }

        };

        // Fetch managers


        fetchUsers();
        fetchLocations();
        fetchManagers();
    }, []);

    const handleAssignManager = async () => {
        if (!selectedUser || !selectedLocation) {
            toast.error("Please select both user and turf");
            return;
        }

        const managerData = {
            userEmail: selectedUser,
            locationName: selectedLocation
        }
        try {
            if (editingManagerId) {
                await editManager(editingManagerId, { newUserEmail: selectedUser });
                toast.success("Manager updated successfully");
            }
            else {
                await addManager(managerData);
                toast.success("Manager added successfully");
            }

            fetchManagers();
            setSelectedUser("");
            setSelectedLocation("");
            setEditingManagerId(null);
        } catch (error) {
            console.error("Error assigning manager", error);
            toast.error("Failed to assign manager");
        }
    };


    const handleDeleteManager = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this manager?");
        if (confirmDelete) {
            try {
                await deleteManager(id);
                toast.success("Manager deleted successfully");
                fetchManagers();
            } catch (error) {
                console.error("Error deleting manager", error);
                toast.error("Failed to delete manager");
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Turf Managers</h2>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Form Panel */}
                <div className="lg:w-1/3 w-full bg-white p-4 rounded-lg shadow">
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Select User</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">-- Select User --</option>
                            {users.map((user) => (
                                <option key={user._id} value={user.email}>
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Select Location</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value="">-- Select Location --</option>
                            {locations.map((location) => (
                                <option key={location._id} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                        onClick={handleAssignManager}
                    >
                        Assign Manager
                    </button>
                </div>

                {/* Right Manager List Panel */}
                <div className="w-full lg:w-1/2 p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">All Managers</h2>

                    {managers.length === 0 ? (
                        <p className="text-gray-500">No managers assigned yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {managers?.map((manager) => (
                                <div
                                    key={manager._id}
                                    className="flex justify-between items-center border p-3 rounded hover:shadow-sm transition"
                                >
                                    <div>
                                        <p className="font-medium">👤{manager.user_id?.email || "Email not available"}</p>
                                        <p className="text-sm text-gray-500">📍 {manager.location_id?.name || "Location not available"}</p>
                                    </div>
                                    <div className="flex gap-2">

                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                            onClick={() => handleDeleteManager(manager._id)}
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
        </div>

    );
}

export default ManageManagers;
