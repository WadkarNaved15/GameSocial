import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  component?: React.ReactNode;
  timeline?: any[];
  team?: TeamMember[];
}

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(project)}
    >
      <img 
        src={project.thumbnail} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{project.description}</p>
        
        {/* Team Members Section */}
        {project.team && (
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex -space-x-2 overflow-hidden">
                {project.team.slice(0, 3).map((member) => (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                ))}
                {project.team.length > 3 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white">
                    <span className="text-xs font-medium text-gray-600">
                      +{project.team.length - 3}
                    </span>
                  </div>
                )}
              </div>
              <span className="ml-3 text-sm text-gray-600">
                {project.team.length} {project.team.length === 1 ? 'member' : 'members'}
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex space-x-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-play-circle mr-1"></i>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-600 hover:text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fab fa-github mr-1"></i>
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};