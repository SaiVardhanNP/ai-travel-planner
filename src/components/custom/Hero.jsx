import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-79  gap-6'>
      <h1 className='font-extrabold  text-center mt-12 text-[30px]'><span className='text-red-500'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
      <p className='text-center text-xl text-gray-500'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget</p>
      <Link to={"/create-trip"}><Button>Get Started, it's Free</Button></Link>
      
    </div>
  )
}

export default Hero
