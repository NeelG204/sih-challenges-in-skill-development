import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { user, skills, achievements } from '../../data/userData';
import { giverStats, topJobs, companyProfile } from '../../data/giverData';
import { teamMembers } from '../../data/giverProfileData';
import { governmentProfile, govOverviewStats } from '../../data/governmentData';
import { useAuth } from '../../context/AuthContext';
import { FaBriefcase, FaUsers, FaCheckCircle, FaClock, FaEye, FaShieldAlt, FaBuilding, FaGraduationCap } from 'react-icons/fa';
import './Profile.css';

function SeekerProfile({ userName }) {
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';

  return (
    <>
      <Card className="profile-header" glow>
        <div className="profile-avatar">
          <span>{initials}</span>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userName || user.name}</h1>
          <p className="profile-title">Level {user.level} • {user.title}</p>
        </div>
      </Card>

      <div className="profile-stats">
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{user.xp.toLocaleString()}</span>
          <span className="profile-stat-label">XP Earned</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">🔥 {user.streak}</span>
          <span className="profile-stat-label">Day Streak</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">#{user.rank}</span>
          <span className="profile-stat-label">Rank</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <CircularProgress
            value={user.overallSkill}
            size={70}
            strokeWidth={6}
            color="var(--accent-cyan)"
            label={`${user.overallSkill}%`}
          />
          <span className="profile-stat-label">Overall Skill</span>
        </Card>
      </div>

      <div className="profile-grid">
        <Card className="profile-skills-section" glow>
          <h3 className="section-title">Skills</h3>
          <div className="profile-skills">
            {skills.map((skill) => (
              <div key={skill.name} className="profile-skill-row">
                <div className="profile-skill-header">
                  <span className="profile-skill-name">{skill.name}</span>
                  <span className="profile-skill-level" style={{ color: skill.color }}>{skill.level}/10</span>
                </div>
                <ProgressBar value={skill.progress} color={skill.color} height={6} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="profile-achievements-section" glow>
          <h3 className="section-title">Achievements</h3>
          <div className="profile-achievements">
            {achievements.map((ach, i) => (
              <div key={i} className="profile-achievement">
                <span className="achievement-icon">{ach.icon}</span>
                <div className="achievement-info">
                  <span className="achievement-title">{ach.title}</span>
                  <span className="achievement-desc">{ach.description}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function GovernmentProfile({ userName }) {
  const displayName = userName || governmentProfile.name;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Card className="profile-header" glow>
        <div className="profile-avatar profile-avatar--government">
          <span>{initials}</span>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{displayName}</h1>
          <p className="profile-title">{governmentProfile.department} • {governmentProfile.portalType}</p>
          <Badge variant="green"><FaShieldAlt /> Official Access</Badge>
        </div>
      </Card>

      <div className="profile-stats">
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{governmentProfile.schemesTracked}</span>
          <span className="profile-stat-label"><FaBriefcase /> Schemes Tracked</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{governmentProfile.institutionsMonitored}</span>
          <span className="profile-stat-label"><FaBuilding /> Institutions</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{govOverviewStats.statesCovered}</span>
          <span className="profile-stat-label"><FaGraduationCap /> States Covered</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{govOverviewStats.dataPoints}</span>
          <span className="profile-stat-label"><FaCheckCircle /> Data Points</span>
        </Card>
      </div>

      <div className="profile-grid">
        <Card className="profile-company-section" glow>
          <h3 className="section-title">Portal Info</h3>
          <div className="giver-company-details">
            <div className="giver-detail-row">
              <span className="giver-detail-label">Ministry</span>
              <span className="giver-detail-value">{governmentProfile.name}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Department</span>
              <span className="giver-detail-value">{governmentProfile.department}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Portal Type</span>
              <span className="giver-detail-value">{governmentProfile.portalType}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Verification</span>
              <span className="giver-detail-value giver-detail-verified"><FaCheckCircle /> Verified</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Document</span>
              <span className="giver-detail-value">{governmentProfile.documentType}</span>
            </div>
          </div>
        </Card>

        <Card className="profile-jobs-section" glow>
          <h3 className="section-title">Overview Stats</h3>
          <div className="giver-jobs-list">
            <div className="giver-job-item">
              <div className="giver-job-info">
                <span className="giver-job-title">Overall Employability</span>
                <div className="giver-job-stats">
                  <span className="giver-job-stat">{govOverviewStats.overallEmployability}%</span>
                </div>
              </div>
              <div className="giver-job-bar">
                <div className="giver-job-bar-fill" style={{ width: `${govOverviewStats.overallEmployability}%` }} />
              </div>
            </div>
            <div className="giver-job-item">
              <div className="giver-job-info">
                <span className="giver-job-title">PMKVY Enrollment</span>
                <div className="giver-job-stats">
                  <span className="giver-job-stat">{govOverviewStats.pmkvyEnrolled}M candidates</span>
                </div>
              </div>
              <div className="giver-job-bar">
                <div className="giver-job-bar-fill" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="giver-job-item">
              <div className="giver-job-info">
                <span className="giver-job-title">Total Graduates Tracked</span>
                <div className="giver-job-stats">
                  <span className="giver-job-stat">{govOverviewStats.totalGraduates}</span>
                </div>
              </div>
              <div className="giver-job-bar">
                <div className="giver-job-bar-fill" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function GiverProfile({ userName }) {
  const displayName = userName || companyProfile.name;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <Card className="profile-header" glow>
        <div className="profile-avatar profile-avatar--giver">
          <span>{initials}</span>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{displayName}</h1>
          <p className="profile-title">{companyProfile.industry} • {companyProfile.employeeRange} employees</p>
          <Badge variant="green"><FaCheckCircle /> Verified Company</Badge>
        </div>
      </Card>

      <div className="profile-stats">
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{giverStats.totalJobs}</span>
          <span className="profile-stat-label"><FaBriefcase /> Jobs Posted</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{giverStats.totalApplicants}</span>
          <span className="profile-stat-label"><FaUsers /> Total Applicants</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{giverStats.activeListings}</span>
          <span className="profile-stat-label"><FaEye /> Active Listings</span>
        </Card>
        <Card className="profile-stat-card" glow>
          <span className="profile-stat-value">{giverStats.pendingReviews}</span>
          <span className="profile-stat-label"><FaClock /> Pending Reviews</span>
        </Card>
      </div>

      <div className="profile-grid">
        <Card className="profile-company-section" glow>
          <h3 className="section-title">Company Info</h3>
          <div className="giver-company-details">
            <div className="giver-detail-row">
              <span className="giver-detail-label">Company</span>
              <span className="giver-detail-value">{companyProfile.name}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Industry</span>
              <span className="giver-detail-value">{companyProfile.industry}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Employees</span>
              <span className="giver-detail-value">{companyProfile.employeeRange}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Founded</span>
              <span className="giver-detail-value">{companyProfile.founded}</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Verification</span>
              <span className="giver-detail-value giver-detail-verified"><FaCheckCircle /> Verified</span>
            </div>
            <div className="giver-detail-row">
              <span className="giver-detail-label">Document</span>
              <span className="giver-detail-value">{companyProfile.documentType}</span>
            </div>
          </div>
        </Card>

        <Card className="profile-jobs-section" glow>
          <h3 className="section-title">Recent Job Listings</h3>
          <div className="giver-jobs-list">
            {topJobs.map((job) => (
              <div key={job.id} className="giver-job-item">
                <div className="giver-job-info">
                  <span className="giver-job-title">{job.title}</span>
                  <div className="giver-job-stats">
                    <span className="giver-job-stat"><FaEye /> {job.views} views</span>
                    <span className="giver-job-stat"><FaUsers /> {job.applications} applicants</span>
                  </div>
                </div>
                <div className="giver-job-bar">
                  <div className="giver-job-bar-fill" style={{ width: `${(job.applications / 50) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="profile-team-section" glow>
        <h3 className="section-title">Hiring Team</h3>
        <div className="giver-team-grid">
          {teamMembers.map((member) => (
            <div key={member.avatar} className="giver-team-member">
              <div className="giver-team-avatar">{member.avatar}</div>
              <div className="giver-team-info">
                <span className="giver-team-name">{member.name}</span>
                <span className="giver-team-role">{member.role}</span>
              </div>
              <span className="giver-team-jobs">{member.jobsPosted} jobs</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

export default function Profile() {
  const { userName, userRole } = useAuth();

  return (
    <div className="page-container profile-page">
      {userRole === 'government' ? (
        <GovernmentProfile userName={userName} />
      ) : userRole === 'giver' ? (
        <GiverProfile userName={userName} />
      ) : (
        <SeekerProfile userName={userName} />
      )}
    </div>
  );
}
