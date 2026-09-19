import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';
import { jobs } from '../../data/jobsData';
import './Jobs.css';

export default function Jobs() {
  return (
    <div className="page-container jobs-page">
      <div>
        <h1 className="page-title">Jobs</h1>
        <p className="page-subtitle">Discover career opportunities matched to your skills</p>
      </div>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <Card key={job.id} className="job-card" glow>
            <div className="job-card-header">
              <div className="job-card-company">
                <span className="job-card-avatar">{job.company[0]}</span>
                <div>
                  <h3 className="job-card-role">{job.role}</h3>
                  <p className="job-card-company-name">{job.company}</p>
                </div>
              </div>
              <div className="job-card-match">
                <span className="match-value">{job.match}%</span>
                <span className="match-label">Skill Match</span>
              </div>
            </div>

            <ProgressBar value={job.match} color="var(--accent-cyan)" height={6} />

            <div className="job-card-details">
              <span className="job-detail">📍 {job.location}</span>
              <span className="job-detail">💰 {job.salary}</span>
              <span className="job-detail">⏰ {job.type}</span>
              <span className="job-detail">📅 {job.posted}</span>
            </div>

            <div className="job-card-skills">
              <span className="job-skills-label">Required Skills</span>
              <div className="job-skills-tags">
                {job.requiredSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={job.missingSkills.includes(skill) ? 'red' : 'green'}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {job.missingSkills.length > 0 && (
              <div className="job-card-missing">
                <span className="missing-label">Missing Skills</span>
                <div className="missing-tags">
                  {job.missingSkills.map((skill) => (
                    <Badge key={skill} variant="red">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            <Button variant="primary">View Job</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
