import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { projects } from '../../data/coursesData';
import './Projects.css';

export default function Projects() {
  return (
    <div className="page-container projects-page">
      <div>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Build real-world projects to solidify your skills</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
