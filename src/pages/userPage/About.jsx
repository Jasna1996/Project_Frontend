import React from 'react'

function About() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/02/49/68/72/360_F_249687268_Yl4AswCdwBQS7NA6hczKq0pfnjQs02UP.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
       <div className="hero-overlay bg-green-700 bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content w-full flex flex-col px-6 sm:px-16">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-lime-400 mb-4">About Us</h2>
          <p className="text-white text-lg">
            We connect players with premium turf venues for unforgettable sports experiences.
            Discover and book top-rated turfs near you — hassle-free and fast!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4">
        <img
              src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2015/09/12/Photos/turf-kHJF--621x414@LiveMint.jpg"
              alt="Turf 1"
              className=" rounded-xl shadow-lg object-cover w-full h-[300px]"
            />
          <img
              src="https://www.sporteeno.com/wp-content/uploads/2021/07/mobs2.jpg"
              alt="Turf 2"
              className="rounded-xl shadow-lg object-cover w-full h-[300px]"
            />
         
            <img
              src="https://www.dlws.edu.in/blog/images/cricket.png"
              alt="Turf 3"
              className="rounded-xl shadow-lg object-cover w-full h-[300px]"
            />
         
        </div>
      </div>
    </div>
  )
}

export default About
