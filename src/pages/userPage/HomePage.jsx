import React   from 'react';

import AboutUs from '../userPage/About'

function HomePage() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://www.lawnpop.com/wp-content/uploads/2024/03/shutterstock_2025816362.jpg)",
        }}
      >
        <div className="hero-overlay bg-green-900 bg-opacity-60"></div>
        <div className="hero-content text-center mt-40px text-neutral-content flex flex-col w-full">
          <div className="max-w-md mx-auto ">
            <h1 className="mb-5 text-5xl font-bold">Book Your Turf</h1>
            <p className="mb-5">
              Find and book the perfect turf near you. Fast, easy, and reliable — your game starts here!
            </p>
          </div>

          {/* Get Started Button with gap */}
          <div className="mt-6">
            <button className="btn bg-lime-400 hover:bg-lime-500 border-none text-black font-bold">
              Get Started
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mt-16 w-full px-6 sm:px-16">
            {[
              { name: 'Turfs Available', value: '120+' },
              { name: 'Happy Players', value: '10,000+' },
              { name: 'Bookings Weekly', value: '1,500+' },
              { name: 'Support 24/7', value: 'Yes' },
            ].map((stat) => (
              <div key={stat.name}>
                <dt className="text-lg text-white/80">{stat.name}</dt>
                <dd className="text-3xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* About section */}
      <div>
        <AboutUs/>
      </div>
      {/* Contact */}
     <div className="hero"
      style={{
        minHeight: "40vh",
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/02/49/68/72/360_F_249687268_Yl4AswCdwBQS7NA6hczKq0pfnjQs02UP.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
         <div className="hero-overlay bg-green-700 bg-opacity-70"></div>
  <div className="max-w-5xl mx-auto text-center ">
    <h2 className="text-3xl font-bold mb-6 text-lime-400">Get in Touch</h2>
    <p className="mb-8 text-white/80">
      Have questions or want to collaborate? We're here to help. Reach out to us through any of the following platforms:
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      <div className="flex items-center gap-3">
        <img src="https://img.icons8.com/color/48/000000/new-post.png" alt="Email" className="w-8 h-8" />
        <a href="mailto:info@turfyourgame.com" className="text-white/80">info@playnest.com</a>
       
      </div>

      <div className="flex items-center gap-3">
        <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
        <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer" className="text-white/80">+91 90000 00000</a>
           
      </div>

      <div className="flex items-center gap-4">
        <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram" className="w-8 h-8" />
        <span className="text-white/80">@play_nest</span>
      </div>

      <div className="flex items-center gap-3">
        <img src="https://img.icons8.com/fluency/48/phone-disconnected.png" alt="Phone" className="w-8 h-8" />
        <span className="text-white/80">+91 90000 00000</span>
       
      </div>
    </div>
  </div>
    </div>
</div>
  );
}

export default HomePage;
