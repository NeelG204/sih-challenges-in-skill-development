import Card from '../Card/Card';
import Badge from '../Badge/Badge';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '../Button/Button';
import './ProjectCard.css';

const difficultyVariant = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red',
};

export default function ProjectCard({ project }) {
  return (
    <Card className="project-card" glow>
      <div className="project-card-header">
        <h3 className="project-card-title">{project.title}</h3>
        <Badge variant={difficultyVariant[project.difficulty] || 'default'}>{project.difficulty}</Badge>
      </div>
      <p className="project-card-description">{project.description}</p>
      <div className="project-card-meta">
        <span>⏱ {project.estimatedTime}</span>
      </div>
      <div className="project-card-tags">
        {project.technologies.map((tech) => (
          <span key={tech} className="project-card-tag">{tech}</span>
        ))}
      </div>
      <div className="project-card-skills">
        {project.skillsGained.slice(0, 3).map((skill) => (
          <span key={skill} className="project-card-skill">+ {skill}</span>
        ))}
      </div>
      {project.progress > 0 && (
        <ProgressBar value={project.progress} color="var(--accent-cyan)" height={6} showLabel />
      )}
      <Button variant={project.progress > 0 ? 'secondary' : 'primary'} size="sm">
        {project.progress === 100 ? 'Review' : project.progress > 0 ? 'Continue' : 'Start Project'}
      </Button>
    </Card>
  );
}
