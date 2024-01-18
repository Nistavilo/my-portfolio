import React from 'react'

const ProjectCard = () => {
  return ( 
    <div>
      <div 
    className='h-52 md:h-72'
    style={{background: 'url(${imgUrl})', backgroundSize: "cover"}}>
      </div>
      <div className='text-white rounded-b-xl bg-[#181818] py-6 px-4'>
        <h5 className='font-xl font-semibold mb-2'>{title}</h5>
        <p> {description} </p>
      </div>
    </div>
  )
}

export default ProjectCard