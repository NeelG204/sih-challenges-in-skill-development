import Card from '../../components/Card/Card';
import './MyListings.css';

export default function MyListings() {
  return (
    <div className="page-container placeholder-page">
      <div>
        <h1 className="page-title">My Job Listings</h1>
        <p className="page-subtitle">Manage your active and past job postings</p>
      </div>
      <Card className="placeholder-card" glow>
        <div className="placeholder-content">
          <span className="placeholder-icon">🚧</span>
          <h2 className="placeholder-title">Coming Soon</h2>
          <p className="placeholder-desc">Job listings management will be available here. Stay tuned!</p>
        </div>
      </Card>
    </div>
  );
}
