import Card from '../../components/Card/Card';
import './Applicants.css';

export default function Applicants() {
  return (
    <div className="page-container placeholder-page">
      <div>
        <h1 className="page-title">All Applicants</h1>
        <p className="page-subtitle">Review and manage all candidates who applied</p>
      </div>
      <Card className="placeholder-card" glow>
        <div className="placeholder-content">
          <span className="placeholder-icon">🚧</span>
          <h2 className="placeholder-title">Coming Soon</h2>
          <p className="placeholder-desc">Applicant management will be available here. Stay tuned!</p>
        </div>
      </Card>
    </div>
  );
}
