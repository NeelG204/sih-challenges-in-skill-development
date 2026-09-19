import ProgressBar from '../ProgressBar/ProgressBar';
import './SkillCard.css';

export default function SkillCard({ name, level, target, gap, color, progress }) {
  const gapColor = gap >= 5 ? 'var(--accent-red)' : gap >= 3 ? 'var(--accent-yellow)' : 'var(--accent-green)';

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <span className="skill-card-name">{name}</span>
        <span className="skill-card-level" style={{ color }}>
          {level}/{target || 10}
        </span>
      </div>
      <ProgressBar value={progress} color={color} height={6} />
      <div className="skill-card-footer">
        <span className="skill-card-gap" style={{ color: gapColor }}>
          Gap: {gap}
        </span>
      </div>
    </div>
  );
}
