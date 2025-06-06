import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getManagerTurf } from '../../services/managerServices';

import { useDispatch } from 'react-redux';

const ManageTurf = () => {
    const [turfs, setTurfs] = useState([]);
    const [editingTurf, setEditingTurf] = useState(null);
    const [formData, setFormData] = useState({
        pricePerHour: { football: "", cricket: "" },
        description: "",
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch();

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (userId) {
            fetchTurfs()
        } else {
            toast.error("User not logged in");
        }
    }, [userId])

    const fetchTurfs = async () => {
        try {
            const response = await getManagerTurf(userId);
            setTurfs(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch turf");
        }
    }

    const handleEdit = (turf) => {
        setEditingTurf(turf._id);
        setFormData({
            pricePerHour: turf.pricePerHour || { football: " ", cricket: " " },
            description: turf.description || " ",
            image: null
        });
        setPreviewImage(turf.image?.url || null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "football" || name === "cricket") {
            setFormData(prev => ({
                ...prev,
                pricePerHour: { ...prev.pricePerHour, [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const form = new FormData();
        form.append('football', formData.pricePerHour.football);
        form.append('cricket', formData.pricePerHour.cricket);
        form.append('description', formData.description);
        if (formData.image) form.append('image', formData.image);

        try {
            await dispatch(updateTurf(editingTurf, form));
            toast.success("Turf updated successfully");
            setEditingTurf(null);
            setPreviewImage(null);
            fetchTurfs();
        } catch (error) {
            toast.error("Failed to update turf");
        }
        finally {
            setIsSaving(false);
        }
    };


    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Turfs</h1>
            <div className="grid grid-cols-1 gap-6">
                {turfs.map((turf) => (
                    <div key={turf._id} className="bg-white p-6 rounded-lg shadow">
                        {editingTurf === turf._id ? (
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-xl font-semibold mb-4">Edit {turf.name}</h3>

                                {/* Image Preview */}
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-60 object-cover rounded mb-4"
                                    />
                                )}
                                <div className="mb-4">
                                    <label className="block mb-2">Change Turf Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-2">Football Price</label>
                                        <input
                                            type="number"
                                            name="football"
                                            value={formData.pricePerHour.football}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">Cricket Price</label>
                                        <input
                                            type="number"
                                            name="cricket"
                                            value={formData.pricePerHour.cricket}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                    />
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingTurf(null);
                                            setPreviewImage(null);
                                        }}
                                        className="px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold">{turf.name}</h3>
                                    <button
                                        onClick={() => handleEdit(turf)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <img
                                    src={turf.image?.url}
                                    alt={turf.name}
                                    className="w-full h-60 object-cover rounded mb-4"
                                />

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <p className="text-gray-600">Football: ₹{turf.pricePerHour?.football || 'N/A'}</p>
                                    <p className="text-gray-600">Cricket: ₹{turf.pricePerHour?.cricket || 'N/A'}</p>
                                </div>

                                <p className="text-gray-700 mb-2">{turf.description}</p>
                                <p className="text-gray-500 text-sm italic">Location: {turf.location_id?.name}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageTurf
