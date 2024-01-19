import React from 'react'
import { CodeBracketIcon,EyeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
const ProjectCard = (projectsData) => {
  return ( 
    <div>
      <div 
    className='h-52 md:h-72 rounded-t-xl relative group-hover:flex group-hover:bg-opacity-80 transition-all duration-500'
    style={{backgroundImage: `url(${projectsData.imgUrl})`, backgroundSize: "cover"}}>
      <div className='overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden'></div>
        <Link href="/" className='h-14 w-14 border-2 relative rounded-full border-[#ADB7BE hover:border-white]'>
          <CodeBracketIcon className='h-10 w-10 text-[#ADB7BE]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:white' /> </Link>
      </div> 
      <div className='text-white rounded-b-xl bg-[#181818] py-6 px-4'>
        <h5 className='font-xl font-semibold mb-2'>{projectsData.title}</h5>
        <p className='text-[#ADB7BE]'> {projectsData.description} </p>
      </div>
    </div>
  )
}

export default ProjectCard