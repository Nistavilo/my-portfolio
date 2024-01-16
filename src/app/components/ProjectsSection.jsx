import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectsSection = () => {
  return (
     <><h2>My Projects</h2> 
     <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
      {projectsData.map((project) => (
        <ProjectCard 
        key={project.id}
         title = {project.title }
          description={project.description} 
          imgUrl={project.image}
          />
          ))}
     </div>
     </>
  )
}

export default ProjectsSection