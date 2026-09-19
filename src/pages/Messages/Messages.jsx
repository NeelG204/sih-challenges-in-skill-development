import Card from '../../components/Card/Card';
import './Messages.css';

export default function Messages() {
  return (
    <div className="page-container placeholder-page">
      <div>
        <h1 className="page-title">Messages</h1>
        <p className="page-subtitle">Communicate with candidates</p>
      </div>
      <Card className="placeholder-card" glow>
        <div className="placeholder-content">
          <span className="placeholder-icon">🚧</span>
          <h2 className="placeholder-title">Coming Soon</h2>
          <p className="placeholder-desc">Messaging functionality will be available here. Stay tuned!</p>
        </div>
      </Card>
    </div>
  );
}
