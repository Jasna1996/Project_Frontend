import React                 from 'react'

import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate=useNavigate();
  return (
    <div className="navbar bg-gradient-to-r from-green-600 via-green-400 to-lime-300  shadow-md px-4 text-white ">
    <div className="flex-1">
      <Link  className="text-2xl font-bold text-white">
        PlayNest
      </Link>
    </div>

     <div className="flex items-center justify-end gap-6 px-4">
      <ul className="flex items-center space-x-6 text-base font-bold">
        <li className="cursor-pointer" onClick={() => navigate("")}>Home</li>
        <li className="cursor-pointer" onClick={() => navigate("/about")}>About Us</li>
        <li className="cursor-pointer" onClick={() => navigate("/contactUs")}>Contact Us</li>
        <li className="cursor-pointer" onClick={() => navigate("/turfs")}>Turfs</li>
        <li className="cursor-pointer" onClick={() => navigate("/bookings")}>Bookings</li>
        <li className="cursor-pointer" onClick={() => navigate("/login")}>Login</li>
      </ul>
    </div>

    {/* Mobile dropdown */}
    <div className="dropdown dropdown-end md:hidden">
      <label tabIndex={0} className="btn btn-ghost">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/turfs">Turfs</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  </div>
  )
}

export default Header
