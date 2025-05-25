import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from '../../services/userServices';
import { persistor } from '../../redux/store';
import { clearUser } from '../../redux/features/userSlice';
import { toast } from 'react-toastify';

function Header() {
  const userData = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    try {
      userLogout().then(() => {
        persistor.purge();
        dispatch(clearUser())
        toast.success("Logged out successfully");
        navigate("/");
      })
    } catch (error) {
      console.log(error)
    }
  }
  const isLoggedIn = userData?.user && Object.keys(userData.user).length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="navbar bg-gradient-to-r from-green-600 via-green-400 to-lime-300  shadow-md px-4 text-white ">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-white">
          PlayNest
          {userData?.user?.name && (
            <span className="ml-2 text-sm font-normal">Hi, {userData.user.name}</span>
          )}
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-end items-center text-base font-bold">
        <ul className="flex space-x-6 list-none m-0 p-0">
          <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("")}>Home</li>
          <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/about")}>About Us</li>
          <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/contactUs")}>Contact Us</li>
          <li className="cursor-pointer whitespace-nowrap" onClick={() => navigate("/turfs")}>Turfs</li>


          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center cursor-pointer space-x-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="avatar">
                  <div className="w-8 rounded-full shadow-md border border-white">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <li
                    className="px-3 py-1 text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/bookings');
                    }}>  My Bookings
                  </li>
                  <li
                    className="px-3 py-1 text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/changePassword');
                    }} > Change Password
                  </li>
                  <li
                    className="px-3 py-1 text-sm hover:bg-white hover:bg-opacity-20 cursor-pointer"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}>  Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <li className="cursor-pointer text-base" onClick={() => navigate('/login')}> Login </li>
          )}
        </ul>
      </div>
      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-500 text-white rounded-box w-52">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contactUs">Contact Us</Link></li>
          <li><Link to="/turfs">Turfs</Link></li>
          {isLoggedIn && <li><Link to="/bookings">Bookings</Link></li>}
          {isLoggedIn ? (
            <>
              <li>{userData.user.name}</li>
              <li><Link to="/changePassword">Change Password</Link></li>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
