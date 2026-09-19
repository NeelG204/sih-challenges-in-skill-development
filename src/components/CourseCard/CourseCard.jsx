import Card from '../Card/Card';
import Badge from '../Badge/Badge';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '../Button/Button';
import './CourseCard.css';

const difficultyVariant = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red',
};

export default function CourseCard({ course }) {
  return (
    <Card className="course-card" glow>
      <div className="course-card-header">
        <h3 className="course-card-title">{course.title}</h3>
        <Badge variant={difficultyVariant[course.difficulty] || 'default'}>{course.difficulty}</Badge>
      </div>
      <p className="course-card-description">{course.description}</p>
      <div className="course-card-meta">
        <span>📚 {course.lessons} lessons</span>
        <span>⏱ {course.duration}</span>
      </div>
      <ProgressBar
        value={course.progress}
        color={course.progress === 100 ? 'var(--accent-green)' : 'var(--accent-purple)'}
        height={6}
        showLabel
      />
      <Button variant={course.progress > 0 ? 'secondary' : 'primary'} size="sm">
        {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
      </Button>
    </Card>
  );
}
