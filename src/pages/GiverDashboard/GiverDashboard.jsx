import { FaBriefcase, FaUsers, FaCheckCircle, FaClock, FaEye, FaPlus, FaArrowRight } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { giverStats, recentApplications, topJobs, companyProfile } from '../../data/giverData';
import './GiverDashboard.css';

const statusVariant = {
  new: 'blue',
  reviewed: 'yellow',
  shortlisted: 'green',
};

const matchColor = (score) => {
  if (score >= 85) return 'green';
  if (score >= 70) return 'cyan';
  return 'yellow';
};

export default function GiverDashboard() {
  const { userName } = useAuth();
  const displayName = userName || companyProfile.name;

  return (
    <div className="page-container giver-dashboard">
      <div className="giver-dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {displayName}!</h1>
          <p className="page-subtitle">Manage your hiring pipeline</p>
        </div>
      </div>

      <div className="giver-dashboard-stats">
        <StatCard icon={<FaBriefcase />} value={`${giverStats.totalJobs}`} label="Jobs Posted" color="var(--accent-purple)" />
        <StatCard icon={<FaUsers />} value={`${giverStats.totalApplicants}`} label="Total Applicants" color="var(--accent-cyan)" trend={32} />
        <StatCard icon={<FaCheckCircle />} value={`${giverStats.activeListings}`} label="Active Listings" color="var(--accent-green)" />
        <StatCard icon={<FaClock />} value={`${giverStats.pendingReviews}`} label="Pending Reviews" color="var(--accent-yellow)" />
      </div>

      <div className="giver-dashboard-grid">
        <Card className="giver-applications-card" glow>
          <div className="giver-applications-header">
            <h3 className="section-title">Recent Applications</h3>
            <span className="giver-view-all">View All <FaArrowRight /></span>
          </div>
          <div className="giver-applications-list">
            {recentApplications.map((app) => (
              <div key={app.id} className="giver-application-row">
                <div className="giver-app-avatar">{app.avatar}</div>
                <div className="giver-app-info">
                  <span className="giver-app-name">{app.name}</span>
                  <span className="giver-app-role">{app.role}</span>
                </div>
                <div className="giver-app-match">
                  <Badge variant={matchColor(app.matchScore)}>{app.matchScore}%</Badge>
                </div>
                <div className="giver-app-status">
                  <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
                </div>
                <span className="giver-app-date">{app.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="giver-dashboard-sidebar">
          <Card className="giver-quick-actions" glow>
            <h3 className="section-title">Quick Actions</h3>
            <div className="giver-actions-list">
              <Button variant="primary" icon={<FaPlus />} className="giver-action-btn">
                Post New Job
              </Button>
              <Button variant="secondary" icon={<FaUsers />} className="giver-action-btn">
                View All Applicants
              </Button>
            </div>
          </Card>

          <Card className="giver-top-jobs" glow>
            <h3 className="section-title">Top Performing Jobs</h3>
            <div className="giver-top-jobs-list">
              {topJobs.map((job) => (
                <div key={job.id} className="giver-top-job-item">
                  <div className="giver-top-job-info">
                    <span className="giver-top-job-title">{job.title}</span>
                    <div className="giver-top-job-stats">
                      <span className="giver-top-job-stat"><FaEye /> {job.views} views</span>
                      <span className="giver-top-job-stat"><FaUsers /> {job.applications} applicants</span>
                    </div>
                  </div>
                  <div className="giver-top-job-bar">
                    <div
                      className="giver-top-job-bar-fill"
                      style={{ width: `${(job.applications / 50) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="giver-verification-card" glow>
            <h3 className="section-title">Company Verification</h3>
            <div className="giver-verification-info">
              <div className="giver-verification-row">
                <span className="giver-verification-label">Company</span>
                <span className="giver-verification-value">{companyProfile.name}</span>
              </div>
              <div className="giver-verification-row">
                <span className="giver-verification-label">Industry</span>
                <span className="giver-verification-value">{companyProfile.industry}</span>
              </div>
              <div className="giver-verification-row">
                <span className="giver-verification-label">Status</span>
                <span className="giver-verification-status">
                  <FaCheckCircle /> Verified
                </span>
              </div>
              <div className="giver-verification-row">
                <span className="giver-verification-label">Document</span>
                <span className="giver-verification-value">{companyProfile.documentType}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
