import Card from '../../components/Card/Card';
import './GiverAnalytics.css';

export default function GiverAnalytics() {
  return (
    <div className="page-container placeholder-page">
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Track your hiring performance and insights</p>
      </div>
      <Card className="placeholder-card" glow>
        <div className="placeholder-content">
          <span className="placeholder-icon">🚧</span>
          <h2 className="placeholder-title">Coming Soon</h2>
          <p className="placeholder-desc">Analytics dashboard will be available here. Stay tuned!</p>
        </div>
      </Card>
    </div>
  );
}
