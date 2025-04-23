import React from 'react'

function ContactUs() {
  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1544914379-806667cd9489?fm=jpg&q=60&w=3000')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="hero-overlay bg-green-900 bg-opacity-70"></div>

    <div className="hero-content flex-col text-center text-neutral-content w-full px-6 py-10">
      <h1 className="text-4xl font-bold mb-6 text-lime-400">Contact Us</h1>
      
      <form className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-xl mx-auto w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered bg-white/90 text-black"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered bg-white/90 text-black"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          className="input input-bordered bg-white/90 text-black"
          required
        />
        <textarea
          placeholder="Address"
          rows="3"
          className="textarea textarea-bordered bg-white/90 text-black"
          required
        ></textarea>

        <button
          type="submit"
          className="btn bg-lime-400 hover:bg-lime-500 text-black font-bold mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}

export default ContactUs
