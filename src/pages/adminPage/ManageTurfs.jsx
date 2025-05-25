import React, { useEffect, useState, useRef } from 'react'
import { axiosInstance } from '../../axios/axiosInstance';
import { addTurf, deleteTurf, editTurf, getAllTurfs } from '../../services/turfServices';
import { toast } from "react-toastify";
function ManageTurfs() {


    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        sport: "",
        pricePerHour: { football: "", cricket: "" },
        ratings: "",
        description: "",
        locationId: "",
        image: null,
    });
    const fileInputRef = useRef(null);

    const [editingTurfId, setEditingTurfId] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchTurfs();
        fetchLocations();
    }, []);

    const fetchTurfs = async () => {
        setLoading(true);
        try {

            const response = await getAllTurfs();
            setTurfs(response.data.data)
        } catch (error) {
            console.error("Error fetching turfs:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchLocations = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/admin/GetAllLocations');
            setLocations(res.data.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "football" || name === "cricket") {
            setFormData((prev) => ({
                ...prev,
                pricePerHour: { ...prev.pricePerHour, [name]: value },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const turfForm = new FormData();
        const selectedLocation = locations.find(loc => loc._id === formData.locationId);
        const locationName = selectedLocation ? selectedLocation.name : "";

        turfForm.append("name", formData.name);
        turfForm.append("sport", formData.sport);
        turfForm.append("ratings", formData.ratings);
        turfForm.append("description", formData.description);
        turfForm.append("locationId", formData.locationId);
        turfForm.append("locationName", locationName);
        turfForm.append("pricePerHour", JSON.stringify(formData.pricePerHour));

        if (formData.image instanceof File) {
            turfForm.append("image", formData.image);
        }

        try {
            if (editingTurfId) {
                await editTurf(editingTurfId, turfForm);
                toast.success("Turf updated successfully");
            } else {
                await addTurf(turfForm);
                toast.success("Turf added successfully");
            }

            setFormData({
                name: "",
                sport: "",
                pricePerHour: { football: "", cricket: "" },
                ratings: "",
                description: "",
                locationId: "",
                image: null,
            });
            setEditingTurfId(null);
            fetchTurfs();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Submit error:", error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    const handleEdit = (turf) => {

        setFormData({
            name: turf.name,
            sport: turf.sport || "",
            pricePerHour: turf.pricePerHour,
            ratings: turf.ratings,
            description: turf.description,
            locationId: turf.location_id?._id || "",
            image: null,
        });
        setEditingTurfId(turf._id);
        if (fileInputRef.current) fileInputRef.current.value = null;

    };
    const handleDelete = async (id) => {
        try {
            await deleteTurf(id);
            toast.success("Turf deleted successfully");
            fetchTurfs();
        } catch (error) {
            console.error("Delete error:", error);
        }
    }



    return (
        <div className="flex gap-6">
            {/* Add/Edit Form */}
            <form onSubmit={handleSubmit} className="w-1/2 p-4 bg-white shadow-md rounded">
                <h2 className="text-xl font-semibold mb-4">{editingTurfId ? "Edit Turf" : "Add Turf"}</h2>
                <select
                    name="locationId"
                    value={formData.locationId}
                    onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
                    className="input mb-2 w-full"
                    required
                >
                    <option value="">-- Select Location --</option>
                    {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>{loc.name}</option>
                    ))}
                </select>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Turf Name" className="input mb-2 w-full" required />

                <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleInputChange}
                    className="input mb-2 w-full"
                    required
                >
                    <option value="">Select Sport</option>
                    <option value="football">Football</option>
                    <option value="cricket">Cricket</option>
                </select>

                <input
                    type="number"
                    name="football"
                    value={formData.pricePerHour.football}
                    onChange={handleInputChange}
                    placeholder="Football Price"
                    className="input mb-2 w-full"
                />

                <input
                    type="number"
                    name="cricket"
                    value={formData.pricePerHour.cricket}
                    onChange={handleInputChange}
                    placeholder="Cricket Price"
                    className="input mb-2 w-full"
                />


                <input type="text" name="ratings" value={formData.ratings} onChange={handleInputChange} placeholder="Ratings" className="input mb-2 w-full" />
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="input mb-2 w-full" />
                <input type="file" name="image" onChange={handleInputChange} className="input mb-2 w-full" ref={fileInputRef} accept="image/*" />
                <button type="submit" className="btn bg-green-600 text-white">{editingTurfId ? "Update" : "Add"}</button>
            </form>

            {/* Turf List */}
            <div className="w-1/2 bg-white shadow-md p-4 rounded">
                <h2 className="text-xl font-semibold mb-4">Turf List</h2>
                {loading ? (
                    <div className="flex flex-col items-center justify-center space-y-2 mt-10">
                        <span className="loading loading-dots loading-xs"></span>
                        <span className="loading loading-dots loading-sm"></span>
                        <span className="loading loading-dots loading-md"></span>
                        <span className="loading loading-dots loading-lg"></span>
                        <span className="loading loading-dots loading-xl"></span>
                    </div>
                ) : (
                    turfs.map((turf) => (
                        <div key={turf._id} className="border-b py-2 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{turf.name}</h3>
                                <img src={turf.image} alt={turf.name} className="w-full h-48 object-cover rounded" />
                                <p className="text-sm">{turf.description}</p>
                                <p className="text-sm text-gray-600">Location: {turf.location_id?.name}</p>
                                <p className="text-sm text-gray-600">
                                    Price:
                                    {Object.entries(turf.pricePerHour).map(([sport, price]) => (
                                        <span key={sport}> {sport}: ₹{price} </span>))}
                                </p>
                                <p className="text-sm text-gray-600">Ratings: {turf.ratings}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(turf)} className="btn-sm bg-yellow-500 text-white px-2 py-1">Edit</button>
                                <button onClick={() => handleDelete(turf._id)} className="btn-sm bg-red-500 text-white px-2 py-1">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ManageTurfs
