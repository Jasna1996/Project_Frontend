import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function About() {

  const images = [
    "https://t3.ftcdn.net/jpg/10/43/17/24/360_F_1043172466_SvwVe2guNS4gUSKMZ3Npkgw1nrOBPoKx.jpg",
    "https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2015/09/12/Photos/turf-kHJF--621x414@LiveMint.jpg",
    "https://www.sporteeno.com/wp-content/uploads/2021/07/mobs2.jpg",
    "https://www.dlws.edu.in/blog/images/cricket.png",
    "https://d26itsb5vlqdeq.cloudfront.net//image/B5C3D15B-0407-167F-51E00AB4B55D258C",
    "https://media.istockphoto.com/id/520999573/photo/indoor-soccer-football-field.jpg?s=612x612&w=0&k=20&c=X2PinGm51YPcqCAFCqDh7GvJxoG2WnJ19aadfRYk2dI=",

  ];

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

        <div className="w-full max-w-6xl">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-xl"
          >
            {images.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`Slide ${index + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-[300px] transition duration-300 ease-in-out transform hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default About
