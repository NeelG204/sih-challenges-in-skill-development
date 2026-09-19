import { FaFire } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import { practiceCategories, practiceChallenges } from '../../data/coursesData';
import './Practice.css';

const difficultyVariant = {
  Beginner: 'green',
  Intermediate: 'yellow',
  Advanced: 'red',
};

export default function Practice() {
  return (
    <div className="page-container practice-page">
      <div>
        <h1 className="page-title">Practice</h1>
        <p className="page-subtitle">Sharpen your skills with daily practice</p>
      </div>

      <Card className="practice-streak-card" glow>
        <div className="streak-content">
          <FaFire className="streak-icon" />
          <div>
            <h3>Daily Practice</h3>
            <p>Keep your streak going!</p>
          </div>
        </div>
        <div className="streak-count">
          <span className="streak-number">🔥 4</span>
          <span className="streak-label">day streak</span>
        </div>
      </Card>

      <div>
        <h2 className="section-title">Practice Categories</h2>
        <div className="practice-categories">
          {practiceCategories.map((cat) => (
            <Card key={cat.name} className="practice-category-card" glow>
              <span className="practice-cat-icon">{cat.icon}</span>
              <h3 className="practice-cat-name">{cat.name}</h3>
              <p className="practice-cat-info">{cat.questions} questions</p>
              {cat.streak > 0 && (
                <span className="practice-cat-streak">🔥 {cat.streak} day streak</span>
              )}
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title">Practice Challenges</h2>
        <div className="practice-challenges-grid">
          {practiceChallenges.map((ch, i) => (
            <Card key={i} className="practice-challenge-card" glow>
              <div className="practice-ch-header">
                <h3>{ch.title}</h3>
                <span className="practice-ch-xp">⭐ {ch.xp} XP</span>
              </div>
              <div className="practice-ch-badges">
                <Badge variant="purple">{ch.category}</Badge>
                <Badge variant={difficultyVariant[ch.difficulty]}>{ch.difficulty}</Badge>
              </div>
              <div className="practice-ch-meta">
                <span>📝 {ch.questions} questions</span>
                <span>⏱ {ch.time}</span>
              </div>
              <Button variant="primary" size="sm">Start Practice</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
