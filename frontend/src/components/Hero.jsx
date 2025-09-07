import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const {navigate} = useContext(ShopContext)
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-2xl shadow-md overflow-hidden">
      {/* Left side: Text section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-12 px-6 sm:px-12">
        <div className="text-gray-800 max-w-lg">
          {/* Small tagline with accent line */}
          <div className="flex items-center gap-3 mb-4">
            <p className="w-10 md:w-14 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-600"></p>
            <p className="font-medium text-sm md:text-base text-gray-600 tracking-wide">
              Unleash Your PC's Potential
            </p>
          </div>

          {/* Main headline */}
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600">Ultimate</span> Upgrade
          </h1>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button
            onClick={()=>{navigate('/components')}}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold shadow-md hover:scale-105 transform transition duration-300">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Hero image */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full object-cover"
          src={assets.hero_img}
          alt="Hero Banner"
        />
      </div>
    </div>
  )
}

export default Hero
