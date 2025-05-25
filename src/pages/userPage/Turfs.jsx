import React, { useEffect, useState } from 'react'
import { listLocations } from '../../services/userServices'
import { listTurfsByLocation } from '../../services/turfServices';
import TimeSlots from '../../components/user/TimeSlots';


function Turfs() {

  const [locations, setLocations] = useState([])
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [loadingTurfs, setLoadingTurfs] = useState(false);


  // ----Backend connection establishes----
  useEffect(() => {
    setLoadingLocations(true);
    listLocations().then((res) => {
      console.log("Location API response:", res.data);
      const locationList = res.data.data
      setLocations(locationList);
      if (locationList.length > 0) {
        console.log("First location ID:", locationList[0]._id)
        setSelectedLocationId(locationList[0]._id)  //auto select first location
      }
    }).catch((err) => console.log(err))
      .finally(() => {
        setLoadingLocations(false);
      });
  }, []);

  // Fetch turfs based on selected location
  useEffect(() => {
    setLoadingTurfs(true);
    if (selectedLocationId) {
      console.log("selectedLocationId:", selectedLocationId);
      listTurfsByLocation(selectedLocationId)
        .then((res) => {

          setTurfs(res.data.data);
          console.log("Turfs:", res.data.data);

        })
        .catch((err) => console.log("Error fetching turfs:", err))
        .finally(() => {
          setLoadingTurfs(false);
        });
    }
  }, [selectedLocationId]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Select Location Title */}
      <h2 className="text-3xl font-bold text-center mb-4 text-green-700">Select Location</h2>

      {/* Location Selector */}
      <div className="flex justify-center mb-10">

        {loadingLocations ? (
          <div className="flex gap-2 items-center">
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>
            <span className="loading loading-dots loading-xl"></span>
            <span>Loading locations...</span>
          </div>
        ) : (
          <ul className="flex flex-wrap gap-3 bg-gray-100 p-3 rounded-full shadow-md">
            {locations.map((location) => (
              <li key={location._id}>
                <button
                  onClick={() => setSelectedLocationId(location._id)}
                  className={`px-5 py-2 rounded-full transition-all font-medium text-sm
                  ${selectedLocationId === location._id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-green-200 border border-gray-300'}`}
                >
                  {location.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Turf Display */}
      <div className="space-y-8">
        {loadingTurfs ? (
          <div className="flex gap-2 items-center justify-center">
            <span className="loading loading-dots loading-xs"></span>
            <span className="loading loading-dots loading-sm"></span>
            <span className="loading loading-dots loading-md"></span>
            <span className="loading loading-dots loading-lg"></span>
            <span className="loading loading-dots loading-xl"></span>
            <span>Loading turfs...</span>
          </div>
        ) : turfs.length > 0 ? (
          turfs.map((turf) => (
            <div key={turf._id} className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col lg:flex-row">
              {/* Image - Left */}
              <div className="md:w-2/5 w-full h-60 md:h-64">
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details - Right */}
              <div className="md:w-3/5 w-full p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">{turf.name}</h3>
                  <p className="text-gray-700 mb-3">{turf.description}</p>

                  <div className="mb-3">
                    <p className="font-semibold mb-1">💰 Price Per Hour (by Sport):</p>
                    {turf.pricePerHour &&
                      Object.entries(
                        turf.pricePerHour instanceof Map
                          ? Object.fromEntries(turf.pricePerHour)
                          : turf.pricePerHour
                      ).map(([sport, price]) => (
                        <p key={sport} className="text-sm">
                          🏅 <strong>{sport}</strong>: ₹{price}
                        </p>
                      ))}
                  </div>

                  <p className="text-yellow-600 text-sm">⭐ {turf.ratings} ratings</p>
                </div>

                <div className="mt-4">
                  <button
                    className="btn btn-success w-full"
                    onClick={() => document.getElementById(`modal_${turf._id}`).showModal()}
                  >
                    Check Availability
                  </button>
                </div>
              </div>

              {/* Timeslot Modal */}
              <TimeSlots
                turf={turf}
                turfId={turf._id}
                turfName={turf.name}
                slots={turf.slots || ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"]}
                bookedSlots={turf.bookedSlots}
              />
            </div>
          ))
        ) : (
          <div role="alert" className="alert alert-info flex items-center gap-2 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
              <path strokeLinecap="round" rokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
              </path>
            </svg>
            <span>No turfs available for this location.</span>
          </div>
        )}
      </div>
    </div>
  );


}

export default Turfs
