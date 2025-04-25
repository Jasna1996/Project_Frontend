import React, { useState } from 'react'

import { useNavigate }     from 'react-router-dom'
import { userSignup }      from '../../services/userServices';
import { toast }           from 'react-toastify';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault();
    userSignup(values).then((res) => {
      console.log("Form values:", values);
      toast.success(res?.data?.message || "User Registered Successfully!")
      navigate("/")
    }).catch(err => {
      console.log("Signup error:", err);
      const errorMessage = err?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage)
    })
  }
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://www.lawnpop.com/wp-content/uploads/2024/03/shutterstock_2025816362.jpg)",
      }}
    >
      <div className="hero-overlay bg-green-900 bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content w-full flex justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-4xl font-bold mb-6 text-white">Sign Up</h1>
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name='name'
              className="input input-bordered w-full bg-white/90 text-black"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name='email'
              className="input input-bordered w-full bg-white/90 text-black"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              name='phone'
              className="input input-bordered w-full bg-white/90 text-black"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              className="input input-bordered w-full bg-white/90 text-black"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name='confirmPassword'
              className="input input-bordered w-full bg-white/90 text-black"
              onChange={((e) => { setValues({ ...values, [e.target.name]: e.target.value }) })}
              required
            />
            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 border-none text-black font-bold mt-4"
             
            >
              Create Account
            </button>
            <p className="text-sm mt-2 text-white">
              Already have an account?{' '}
              <span className="underline cursor-pointer" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
