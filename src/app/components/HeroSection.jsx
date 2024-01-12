import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-12'>

        <div className='col-span-7 place-self-center text-center sm:text-left'>

          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold' >
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Hello, I'm {""} </span> Emirhan
          </h1>

          <p className='text-[#ADB7BE] text-base text-lg mb-6 lg:text-xl'>

          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, omnis.

          </p>
          <div>
            <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-[#42b883] via-[#00d0f6] to-[#d6002f] hover:bg-slate-200 text-white' >Hire Me</button>
            <button className='px-1 py-1 w-full sm:w-fit rounded-full  bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-800  mt-3' >
               <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Dowload CV</span>
            </button>
          </div>
        </div>
        <div className='col-span-5 place-self-center mt-4 lg:mt-0'>
          <div className='rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] relative'>          
            <Image
            src="/images/hero-image.png"
            alt="hero-image"
            className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
            width={300}
            height={300}
          />

          </div>

        </div>
      </div>
      
    </section>)
}

export default HeroSection