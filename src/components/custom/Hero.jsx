import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
        className='font-extrabold text-[44px] text-center mt-16'
      >
        <span className='text-[#f56551]'> Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>

      <p className='text-xl text-[19px] text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom Itineraries tailored to your interests and budget</p>
      <Link to={'/create-trip'}>
        <Button className="cursor-pointer">Get Started, It's Free</Button>
      </Link>
      
      <img className='my-8 rounded-lg bg-transparent' src="/landing-image1.png" alt="Loading image..." />
    </div>
  )
}

export default Hero