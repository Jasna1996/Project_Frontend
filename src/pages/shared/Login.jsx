import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { userLogin } from '../../services/userServices';
import { useDispatch } from 'react-redux'
import { saveUser } from '../../redux/features/userSlice';

function Login({ role }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from || '/';

  useEffect(() => {
    const pending = localStorage.getItem("pendingBooking");
    if (pending) {
      localStorage.removeItem("pendingBooking");
      navigate(from, { state: JSON.parse(pending) });
    }
  }, [from, navigate]);


  const bookingData = location.state?.data || null;

  const onSubmit = (e) => {
    e.preventDefault();
    userLogin(values, role).then((res) => {
      const user = res.data.user;
      const token = res.data.token;

      if (role == "admin") {
        localStorage.setItem("admin-token", res?.data?.token)
        toast.success(res?.data?.message || "Admin login Successfully!");
        navigate("/admin/dashboard")

      } else if (user.role === "manager") {
        localStorage.setItem("manager-token", token);
        localStorage.setItem("userId", user._id);
        toast.success(res?.data?.message || "Manager login successful!");
        dispatch(saveUser(user));
        navigate("/manager");
      }
      else {

        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        toast.success(res?.data?.message || "User login Successfully!")
        dispatch(saveUser(res.data.user));
        // Redirect logic with booking data
        if (from === '/booknow' && bookingData) {
          navigate(from, { state: bookingData });
        } else {
          navigate("/");
        }

      }
    }).catch(err => {
      console.log("Login error:", err);
      const errorMessage = err?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage?.response?.data?.message || "Login failed");
      toast.error(errorMessage);
    })
  }

  // Determine if we should show the signup link
  const showSignupLink = role !== 'admin' && role !== 'manager';

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://www.lawnpop.com/wp-content/uploads/2024/03/shutterstock_2025816362.jpg)",
      }}
    >
      <div className="hero-overlay bg-green-900 bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content w-full flex flex-col items-center justify-center px-4">
        {/* Paragraph Section */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Welcome to <span className="text-lime-300">PlayNest</span> 🌟
          </h2>
          <p className="text-white text-base md:text-lg">
            {role === 'admin'
              ? 'Admin portal - Manage the system'
              : role === 'manager'
                ? 'Manager portal - Manage your location'
                : 'Book your favorite turfs effortlessly!'}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md">

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {role === 'admin'
              ? 'Admin Login'
              : role === 'manager'
                ? 'Manager Login'
                : 'User Login'}
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              name='email'
              className="input input-bordered w-full bg-white/90 text-black placeholder-gray-500"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              className="input input-bordered w-full bg-white/90 text-black placeholder-gray-500"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 border-none text-black font-bold mt-4"
              onClick={onSubmit}
            >
              LogIn
            </button>
            {showSignupLink && (
              <p className="text-sm mt-2 text-white">
                Don’t have an account?{ } <span className="underline cursor-pointer"
                  onClick={() => navigate("/signup")}>Register</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
