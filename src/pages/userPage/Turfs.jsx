import React, { useEffect, useState } from 'react'
import { listLocations } from '../../services/userServices'
import { listTurfsByLocation } from '../../services/turfServices';
import TimeSlots from '../../components/user/TimeSlots';


function Turfs() {

  const [locations, setLocations] = useState([])
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [turfs, setTurfs] = useState([])
  // ----Backend connection establishes----
  useEffect(() => {
    listLocations().then((res) => {
      console.log("Location API response:", res.data);
      const locationList = res.data.data
      setLocations(locationList);
      if (locationList.length > 0) {
        console.log("First location ID:", locationList[0]._id)
        setSelectedLocationId(locationList[0]._id)//auto select first location
      }
    }).catch((err) => console.log(err))
  }, []);

  // Fetch turfs based on selected location
  useEffect(() => {
    if (selectedLocationId) {
      console.log("selectedLocationId:", selectedLocationId);
      listTurfsByLocation(selectedLocationId)
        .then((res) => {

          setTurfs(res.data.data);


        })
        .catch((err) => console.log("Error fetching turfs:", err));
    }
  }, [selectedLocationId]);

  return (
    <div className='p-4'>
      <h2 className="text-xl font-bold mb-4">Select Location</h2>
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mb-6">
        {locations.map((location) => (
          <li key={location._id}>
            <a className={selectedLocationId === location._id ? 'active' : ''}
              onClick={() => setSelectedLocationId(location._id)}>{location.name}</a>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {turfs.length > 0 ? (
          turfs.map((turf) => (
            <div key={turf._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{turf.name}</h2>
                <p>{turf.description}</p>
                <p>💰 {turf.pricePerHead} per head</p>
                <p>⭐ {turf.ratings} ratings</p>
                <button className="btn btn-success btn-sm"
                  onClick={() => document.getElementById(`modal_${turf._id}`).showModal()}>Check Availability</button>
              </div>
              <TimeSlots
                turfId={turf._id}
                turfName={turf.name}
                slots={["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"]} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No turfs available for this location.</p>
        )}
      </div>

    </div>
  )
}

export default Turfs
