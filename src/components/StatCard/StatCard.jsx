import Card from '../Card/Card';
import './StatCard.css';

export default function StatCard({ icon, value, label, color = 'var(--accent-purple)', trend }) {
  return (
    <Card className="stat-card" glow>
      <div className="stat-card-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stat-card-content">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
      {trend && (
        <span className={`stat-card-trend ${trend > 0 ? 'stat-card-trend--up' : 'stat-card-trend--down'}`}>
          {trend > 0 ? '+' : ''}{trend}
        </span>
      )}
    </Card>
  );
}
