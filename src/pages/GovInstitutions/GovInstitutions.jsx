import { FaUniversity, FaStar, FaExclamationCircle, FaBriefcase } from 'react-icons/fa';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import { institutionalComparison, institutions } from '../../data/governmentData';
import './GovInstitutions.css';

const tooltipStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.8rem',
};

export default function GovInstitutions() {
  return (
    <div className="page-container gov-institutions">
      <div>
        <h1 className="page-title">Institutional Analysis</h1>
        <p className="page-subtitle">Comparing skill provision across institution tiers</p>
      </div>

      <div className="gov-inst-grid">
        {institutions.map((inst) => (
          <Card key={inst.name} className="gov-inst-card" glow>
            <div className="gov-inst-header" style={{ borderLeftColor: inst.color }}>
              <div className="gov-inst-icon" style={{ background: `${inst.color}20`, color: inst.color }}>
                <FaUniversity />
              </div>
              <div className="gov-inst-header-info">
                <h3 className="gov-inst-name">{inst.name}</h3>
                <Badge variant={inst.tier === 'Tier 1 Premier' ? 'purple' : inst.tier === 'State Autonomous' ? 'blue' : 'green'}>
                  {inst.tier}
                </Badge>
              </div>
            </div>
            <div className="gov-inst-details">
              <div className="gov-inst-detail">
                <span className="gov-inst-detail-label"><FaStar /> Core Strength</span>
                <span className="gov-inst-detail-value">{inst.strength}</span>
              </div>
              <div className="gov-inst-detail">
                <span className="gov-inst-detail-label"><FaExclamationCircle /> Primary Gap</span>
                <span className="gov-inst-detail-value gov-inst-gap">{inst.gap}</span>
              </div>
              <div className="gov-inst-detail">
                <span className="gov-inst-detail-label"><FaBriefcase /> Industry Fit</span>
                <span className="gov-inst-detail-value">{inst.industryFit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="gov-inst-charts-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Faculty Metrics Comparison</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={institutionalComparison.facultyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="metric" stroke="var(--text-muted)" fontSize={10} angle={-15} textAnchor="end" height={60} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 10]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="industry" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={14} name="Industry Req." />
                <Bar dataKey="iitBombay" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={14} name="IIT Bombay" />
                <Bar dataKey="vitPune" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={14} name="VIT Pune" />
                <Bar dataKey="pdeu" fill="#10b981" radius={[4, 4, 0, 0]} barSize={14} name="PDEU" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Skill Provision Radar</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={institutionalComparison.skillScores}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="skill" stroke="var(--text-muted)" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="var(--text-muted)" fontSize={10} />
                <Tooltip contentStyle={tooltipStyle} />
                <Radar name="Industry" dataKey="industry" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="IIT Bombay" dataKey="iitBombay" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="VIT Pune" dataKey="vitPune" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="PDEU" dataKey="pdeu" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
