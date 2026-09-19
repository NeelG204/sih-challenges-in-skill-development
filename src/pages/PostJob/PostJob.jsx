import Card from '../../components/Card/Card';
import './PostJob.css';

export default function PostJob() {
  return (
    <div className="page-container placeholder-page">
      <div>
        <h1 className="page-title">Post a New Job</h1>
        <p className="page-subtitle">Create a job listing to find the best candidates</p>
      </div>
      <Card className="placeholder-card" glow>
        <div className="placeholder-content">
          <span className="placeholder-icon">🚧</span>
          <h2 className="placeholder-title">Coming Soon</h2>
          <p className="placeholder-desc">Job posting functionality will be available here. Stay tuned!</p>
        </div>
      </Card>
    </div>
  );
}
