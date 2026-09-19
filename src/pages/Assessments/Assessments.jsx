import { FaLock, FaUnlock, FaClock, FaQuestionCircle } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import { assessments } from '../../data/coursesData';
import './Assessments.css';

export default function Assessments() {
  return (
    <div className="page-container assessments-page">
      <div>
        <h1 className="page-title">Assessments</h1>
        <p className="page-subtitle">Test your knowledge and unlock new levels</p>
      </div>

      <div className="assessments-grid">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className={`assessment-card ${assessment.status === 'locked' ? 'assessment-card--locked' : ''}`} glow={assessment.status !== 'locked'}>
            <div className="assessment-card-header">
              <div className="assessment-card-icon">
                {assessment.status === 'locked' ? <FaLock /> : <FaUnlock />}
              </div>
              <Badge variant={assessment.status === 'locked' ? 'red' : 'green'}>
                {assessment.status}
              </Badge>
            </div>
            <h3 className="assessment-card-title">{assessment.title}</h3>
            <p className="assessment-card-subtitle">{assessment.subtitle}</p>
            <div className="assessment-card-meta">
              <span><FaQuestionCircle /> {assessment.questions} Questions</span>
              <span><FaClock /> {assessment.duration}</span>
            </div>
            <div className="assessment-card-skills">
              {assessment.skills.map((skill) => (
                <Badge key={skill} variant="purple">{skill}</Badge>
              ))}
            </div>
            <Button
              variant={assessment.status === 'locked' ? 'secondary' : 'primary'}
              disabled={assessment.status === 'locked'}
            >
              {assessment.status === 'locked' ? '🔒 Locked' : 'Start Assessment'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
