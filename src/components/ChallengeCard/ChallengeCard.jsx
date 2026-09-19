import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import Badge from '../Badge/Badge';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '../Button/Button';
import './ChallengeCard.css';

const difficultyVariant = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red',
};

const categoryVariant = {
  Python: 'yellow',
  DSA: 'cyan',
  SQL: 'blue',
  Git: 'orange',
};

export default function ChallengeCard({ challenge }) {
  const navigate = useNavigate();

  return (
    <Card className="challenge-card" glow onClick={() => navigate(`/challenges/${challenge.slug}`)}>
      <div className="challenge-card-header">
        <h3 className="challenge-card-title">{challenge.title}</h3>
        <span className="challenge-card-xp">⭐ {challenge.xp} XP</span>
      </div>
      <div className="challenge-card-badges">
        <Badge variant={categoryVariant[challenge.category] || 'default'}>{challenge.category}</Badge>
        <Badge variant={difficultyVariant[challenge.difficulty] || 'default'}>{challenge.difficulty}</Badge>
      </div>
      <div className="challenge-card-info">
        <span className="challenge-card-time">⏱ {challenge.estimatedTime}</span>
      </div>
      {challenge.progress > 0 && (
        <ProgressBar value={challenge.progress} color="var(--accent-cyan)" height={6} showLabel />
      )}
      <Button
        variant={challenge.progress > 0 ? 'secondary' : 'primary'}
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/challenges/${challenge.slug}`);
        }}
      >
        {challenge.progress > 0 ? 'Continue' : 'Start Challenge'}
      </Button>
    </Card>
  );
}
