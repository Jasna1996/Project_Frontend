import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate=useNavigate();
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
          <h1 className="text-4xl font-bold mb-6 text-white">Login</h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white/90 text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full bg-white/90 text-black"
              required
            />
            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 border-none text-black font-bold mt-4"
            >
              Sign In
            </button>
            <p className="text-sm mt-2 text-white">
              Don’t have an account? <span className="underline cursor-pointer"  onClick={() => navigate("/signup")}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
