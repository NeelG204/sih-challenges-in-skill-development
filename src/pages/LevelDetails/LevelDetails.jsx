import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck, FaBook, FaCode, FaHammer, FaClipboardCheck } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import { levelDetails } from '../../data/roadmapData';
import './LevelDetails.css';

export default function LevelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const level = levelDetails[id] || levelDetails[2];

  const progress = Math.round((level.completedTasks / level.totalTasks) * 100);

  return (
    <div className="page-container level-details">
      <div className="level-hero">
        <div className="level-hero-content">
          <Badge variant="purple">Level {id}</Badge>
          <h1 className="level-title">{level.title}</h1>
          <p className="level-subtitle">{level.subtitle}</p>

          <div className="level-topics">
            <h3 className="level-topics-title">What you will learn</h3>
            {level.topics.map((topic) => (
              <div key={topic} className="level-topic">
                <FaCheck className="level-topic-icon" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="level-hero-visual">
          <div className="level-hero-card">
            <CircularProgress
              value={progress}
              size={120}
              strokeWidth={10}
              color="var(--accent-cyan)"
              label={`${progress}%`}
              sublabel="Level Progress"
            />
            <div className="level-hero-stats">
              <span className="level-hero-stat">{level.completedTasks}/{level.totalTasks} tasks completed</span>
              <span className="level-hero-stat">XP: {level.earnedXp} / {level.totalXp}</span>
            </div>
          </div>
        </div>
      </div>

      <ProgressBar value={level.earnedXp} max={level.totalXp} color="var(--accent-cyan)" height={10} showLabel />

      <div className="level-actions-grid">
        <Card className={`level-action-card level-action-card--${level.learn.status}`} glow>
          <div className="level-action-icon level-action-icon--learn">
            <FaBook />
          </div>
          <div className="level-action-info">
            <Badge variant={level.learn.status === 'completed' ? 'green' : 'yellow'}>{level.learn.status}</Badge>
            <h3>LEARN</h3>
            <p>{level.learn.items} Concepts • ~{level.learn.hours} Hours</p>
          </div>
          <Button
            variant={level.learn.status === 'completed' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => navigate('/learn')}
          >
            {level.learn.status === 'completed' ? 'Review Learning' : 'Start Learning'}
          </Button>
        </Card>

        <Card className={`level-action-card level-action-card--${level.practice.status}`} glow>
          <div className="level-action-icon level-action-icon--practice">
            <FaCode />
          </div>
          <div className="level-action-info">
            <Badge variant={level.practice.status === 'completed' ? 'green' : 'yellow'}>{level.practice.status}</Badge>
            <h3>PRACTICE</h3>
            <p>{level.practice.items} Challenges • ~{level.practice.hours} Hours</p>
          </div>
          <Button
            variant={level.practice.status === 'completed' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => navigate('/practice')}
          >
            Start Practice
          </Button>
        </Card>

        <Card className={`level-action-card level-action-card--${level.build.status}`} glow>
          <div className="level-action-icon level-action-icon--build">
            <FaHammer />
          </div>
          <div className="level-action-info">
            <Badge variant={level.build.status === 'completed' ? 'green' : 'default'}>{level.build.status}</Badge>
            <h3>BUILD</h3>
            <p>{level.build.name} • ~{level.build.hours} Hours</p>
          </div>
          <Button
            variant={level.build.status === 'completed' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => navigate('/challenges')}
          >
            Start Project
          </Button>
        </Card>
      </div>

      <Card className="level-assessment" glow>
        <div className="assessment-content">
          <div className="assessment-icon">
            <FaClipboardCheck />
          </div>
          <div>
            <h3>LEVEL ASSESSMENT</h3>
            <p>Test your skills and unlock Level {parseInt(id) + 1}</p>
          </div>
        </div>
        <Button variant="primary" onClick={() => navigate('/assessments')}>
          Start Assessment
        </Button>
      </Card>
    </div>
  );
}
