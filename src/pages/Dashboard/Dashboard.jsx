import { useNavigate } from 'react-router-dom';
import { FaFire, FaRocket, FaTrophy, FaStar, FaArrowRight } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import SkillCard from '../../components/SkillCard/SkillCard';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { user, skills, recommendations } from '../../data/userData';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userName } = useAuth();
  const displayName = userName || user.name;

  return (
    <div className="page-container dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {displayName}! 👋</h1>
          <p className="page-subtitle">Your journey from {user.journey.from}/10 to {user.journey.to}/10 in {user.journey.skill}</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatCard icon={<FaFire />} value={`${user.streak}`} label="Day Streak" color="var(--accent-orange)" trend={2} />
        <StatCard icon={<FaTrophy />} value={`#${user.rank}`} label="Overall Rank" color="var(--accent-purple)" />
        <StatCard icon={<FaStar />} value={user.xp.toLocaleString()} label="XP Earned" color="var(--accent-yellow)" trend={user.weeklyXp} />
        <StatCard icon={<FaRocket />} value={`${user.overallSkill}%`} label="Overall Skill" color="var(--accent-magenta)" />
      </div>

      <div className="dashboard-grid">
        <Card className="dashboard-python-card" glow>
          <div className="python-card-content">
            <div className="python-card-info">
              <span className="python-card-badge">🐍 Python Progress</span>
              <div className="python-card-levels">
                <span className="python-card-current">{user.journey.from}/10</span>
                <span className="python-card-arrow">→</span>
                <span className="python-card-target">{user.journey.to}/10</span>
              </div>
              <div className="python-card-xp">
                <span>{user.xp.toLocaleString()} XP</span>
                <span className="python-card-modules">{user.level * 4} Modules Completed</span>
              </div>
            </div>
            <div className="python-card-visual">
              <CircularProgress value={30} size={100} strokeWidth={8} color="var(--accent-magenta)" label="30%" sublabel="Progress" />
            </div>
          </div>
        </Card>

        <div className="dashboard-overview">
          <h3 className="section-title">Quick Overview</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <span className="overview-label">Current Level</span>
              <span className="overview-value overview-value--purple">{user.journey.from}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Next Target</span>
              <span className="overview-value overview-value--purple">Level {user.journey.to}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Rank</span>
              <span className="overview-value overview-value--magenta">#{user.rank}</span>
              <span className="overview-sub">Top 10%</span>
            </div>
            <div className="overview-item overview-item--xp">
              <span className="overview-label">XP This Week</span>
              <span className="overview-value overview-value--green">+{user.weeklyXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="dashboard-skills-section">
          <h3 className="section-title">Skill Gap Overview</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard key={skill.name} {...skill} />
            ))}
          </div>
        </div>

        <div className="dashboard-actions">
          <Card className="dashboard-action-card" glow>
            <h3 className="action-card-title">Continue Learning</h3>
            <div className="action-card-item" onClick={() => navigate('/levels/2')}>
              <div className="action-card-item-info">
                <span className="action-card-item-icon">🐍</span>
                <div>
                  <span className="action-card-item-name">Python Problem Solver</span>
                  <span className="action-card-item-meta">Level 4 • 75% complete</span>
                </div>
              </div>
              <Button variant="primary" size="sm">Continue</Button>
            </div>
          </Card>

          <Card className="dashboard-action-card" glow>
            <h3 className="action-card-title">Recommended for you</h3>
            {recommendations.slice(1).map((rec, i) => (
              <div key={i} className="action-card-item" onClick={() => navigate('/learn')}>
                <div className="action-card-item-info">
                  <span className="action-card-item-icon">{i === 0 ? '🧮' : '📂'}</span>
                  <div>
                    <span className="action-card-item-name">{rec.title}</span>
                    <span className="action-card-item-meta">{rec.subtitle}</span>
                  </div>
                </div>
                <FaArrowRight className="action-card-arrow" />
              </div>
            ))}
          </Card>

          <Card className="dashboard-action-card next-challenge-card" glow>
            <h3 className="action-card-title">Next Challenge</h3>
            <div className="next-challenge-content">
              <span className="next-challenge-name">Build Expense Tracker</span>
              <Button variant="primary" size="sm" onClick={() => navigate('/challenges/expense-tracker')}>
                Start Challenge
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
