import { FaBuilding, FaGraduationCap, FaUsers, FaChartLine } from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import { useAuth } from '../../context/AuthContext';
import {
  govOverviewStats, employabilityTrend, pmkvyFunnel,
  skillDemandSupplyGap, hiringGrowth2026, employabilityByQualification,
} from '../../data/governmentData';
import './GovDashboard.css';

const tooltipStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.8rem',
};

export default function GovDashboard() {
  const { userName } = useAuth();

  return (
    <div className="page-container gov-dashboard">
      <div className="gov-dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {userName || 'Official'}!</h1>
          <p className="page-subtitle">National Skill Development Overview</p>
        </div>
      </div>

      <div className="gov-dashboard-stats">
        <StatCard icon={<FaBuilding />} value={`${govOverviewStats.totalInstitutions}`} label="Institutions Tracked" color="#f59e0b" />
        <StatCard icon={<FaGraduationCap />} value={`${govOverviewStats.overallEmployability}%`} label="Employability Rate" color="var(--accent-green)" trend={1.54} />
        <StatCard icon={<FaUsers />} value={`${govOverviewStats.pmkvyEnrolled}M`} label="PMKVY Enrolled" color="var(--accent-purple)" />
        <StatCard icon={<FaChartLine />} value={`${govOverviewStats.pmkvyPlaced}M`} label="PMKVY Placed" color="var(--accent-cyan)" />
      </div>

      <div className="gov-dashboard-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">National Employability Trend (2022-2026)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={employabilityTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[40, 60]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="employable"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                  name="% Employable"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">PMKVY Program Funnel (Millions)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pmkvyFunnel} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} />
                <YAxis type="category" dataKey="stage" stroke="var(--text-muted)" fontSize={12} width={70} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="candidates" radius={[0, 6, 6, 0]} barSize={28}>
                  {pmkvyFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="gov-dashboard-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Skill Demand-Supply Gap by Role</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={skillDemandSupplyGap} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="role" stroke="var(--text-muted)" fontSize={11} angle={-20} textAnchor="end" height={50} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="gap" radius={[6, 6, 0, 0]} barSize={32} name="Gap %">
                  {skillDemandSupplyGap.map((entry) => (
                    <Cell
                      key={entry.role}
                      fill={entry.gap >= 80 ? '#ef4444' : entry.gap >= 60 ? '#f59e0b' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">AI/ML vs IT Sector Hiring Growth (2026)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hiringGrowth2026} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="aiML" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={20} name="AI/ML Roles %" />
                <Bar dataKey="itSector" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} name="IT Sector %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="gov-dashboard-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Employability by Qualification</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employabilityByQualification} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <YAxis type="category" dataKey="qualification" stroke="var(--text-muted)" fontSize={11} width={95} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="employable" radius={[0, 6, 6, 0]} barSize={20} name="% Employable">
                  {employabilityByQualification.map((entry) => (
                    <Cell
                      key={entry.qualification}
                      fill={entry.employable >= 70 ? '#10b981' : entry.employable >= 55 ? '#f59e0b' : '#ef4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-dashboard-insights" glow>
          <h3 className="section-title">Key Insights</h3>
          <div className="gov-insights-list">
            <div className="gov-insight-item">
              <span className="gov-insight-badge gov-insight-badge--up">+34%</span>
              <div className="gov-insight-text">
                <span className="gov-insight-title">AI/ML Hiring Surge</span>
                <span className="gov-insight-desc">YoY growth in AI/ML roles while IT sector remains flat</span>
              </div>
            </div>
            <div className="gov-insight-item">
              <span className="gov-insight-badge gov-insight-badge--down">93%</span>
              <div className="gov-insight-text">
                <span className="gov-insight-title">Cybersecurity Gap</span>
                <span className="gov-insight-desc">India needs 3M professionals, only 200K trained</span>
              </div>
            </div>
            <div className="gov-insight-item">
              <span className="gov-insight-badge gov-insight-badge--neutral">56.35%</span>
              <div className="gov-insight-text">
                <span className="gov-insight-title">National Employability</span>
                <span className="gov-insight-desc">Up from 46.2% in 2022 — steady improvement</span>
              </div>
            </div>
            <div className="gov-insight-item">
              <span className="gov-insight-badge gov-insight-badge--down">5.6%</span>
              <div className="gov-insight-text">
                <span className="gov-insight-title">PMKVY Placement Rate</span>
                <span className="gov-insight-desc">Only 200K placed out of 3.54M enrolled</span>
              </div>
            </div>
            <div className="gov-insight-item">
              <span className="gov-insight-badge gov-insight-badge--up">75%</span>
              <div className="gov-insight-text">
                <span className="gov-insight-title">Seat Fill Rate</span>
                <span className="gov-insight-desc">Engineering seats filled in 2024-25</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
