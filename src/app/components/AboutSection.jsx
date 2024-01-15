"use client";
import React, {useTransition,useState} from 'react'
import Image from 'next/image'
import TabButton from './TabButton';

const AboutSection = () => {
  const [tab,setTab] = useState("skills")
  const [startTransition, isPending] = useTransition()
  const handleTabChange = (id) =>{
    startTransition(()=>{
      setTab(id);
    })
  }

  return (
    <section className='text-white'>
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <Image src="/images/about-image.png" width={500} height={500}/>
        <div>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='text-base lg:text-lg'>Lorem ipsum dolor sit, 
          amet consectetur adipisicing elit. In repudiandae, 
          possimus harum ratione voluptas exercitationem ipsam est fugit perspiciatis eius!
          </p>
          <div className='flex flex-row mt-8'>
            <TabButton selectTab{()=> handleTabChange("skills")} active{tab === "skills"}> Skills </TabButton>
        </div>
      </div>
      </section>
  )
}

export default AboutSection