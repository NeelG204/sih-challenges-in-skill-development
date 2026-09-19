import { FaUsers, FaCheckCircle, FaClock, FaPercentage } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import Badge from '../../components/Badge/Badge';
import { pmkvyFunnel, pmkvySectorPlacement } from '../../data/governmentData';
import './GovSchemes.css';

const tooltipStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.8rem',
};

const schemes = [
  { name: 'PMKVY', fullName: 'Pradhan Mantri Kaushal Vikas Yojana', status: 'active', enrolled: '3.54M', placed: '200K', rate: '5.6%' },
  { name: 'NSDC', fullName: 'National Skill Development Corporation', status: 'active', enrolled: '12.4M', placed: '3.8M', rate: '30.6%' },
  { name: 'DDU-GKY', fullName: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana', status: 'active', enrolled: '1.8M', placed: '1.2M', rate: '66.7%' },
  { name: 'PMAKY', fullName: 'Pradhan Mantri Attach Wikas Yojana', status: 'review', enrolled: '0.9M', placed: '0.4M', rate: '44.4%' },
];

export default function GovSchemes() {
  return (
    <div className="page-container gov-schemes">
      <div>
        <h1 className="page-title">Government Schemes</h1>
        <p className="page-subtitle">Skill development programs and their outcomes</p>
      </div>

      <div className="gov-schemes-stats">
        <StatCard icon={<FaUsers />} value="3.54M" label="Total Enrolled (PMKVY)" color="#f59e0b" />
        <StatCard icon={<FaCheckCircle />} value="200K" label="Total Placed" color="var(--accent-green)" />
        <StatCard icon={<FaClock />} value="683K" label="Dropouts" color="#ef4444" />
        <StatCard icon={<FaPercentage />} value="5.6%" label="Placement Rate" color="var(--accent-purple)" />
      </div>

      <div className="gov-schemes-grid">
        <Card className="gov-scheme-list-card" glow>
          <h3 className="section-title">Active Schemes</h3>
          <div className="gov-scheme-list">
            {schemes.map((scheme) => (
              <div key={scheme.name} className="gov-scheme-row">
                <div className="gov-scheme-info">
                  <span className="gov-scheme-name">{scheme.name}</span>
                  <span className="gov-scheme-full">{scheme.fullName}</span>
                </div>
                <div className="gov-scheme-metrics">
                  <div className="gov-scheme-metric">
                    <span className="gov-scheme-metric-value">{scheme.enrolled}</span>
                    <span className="gov-scheme-metric-label">Enrolled</span>
                  </div>
                  <div className="gov-scheme-metric">
                    <span className="gov-scheme-metric-value">{scheme.placed}</span>
                    <span className="gov-scheme-metric-label">Placed</span>
                  </div>
                  <div className="gov-scheme-metric">
                    <span className="gov-scheme-metric-value">{scheme.rate}</span>
                    <span className="gov-scheme-metric-label">Rate</span>
                  </div>
                </div>
                <Badge variant={scheme.status === 'active' ? 'green' : 'yellow'}>
                  {scheme.status === 'active' ? 'Active' : 'Under Review'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">PMKVY Sector-wise Placement (%)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pmkvySectorPlacement} layout="vertical" margin={{ top: 10, right: 30, left: 90, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} domain={[0, 20]} />
                <YAxis type="category" dataKey="sector" stroke="var(--text-muted)" fontSize={11} width={85} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="placed" radius={[0, 6, 6, 0]} barSize={22} name="% Placed">
                  {pmkvySectorPlacement.map((entry) => (
                    <Cell key={entry.sector} fill={entry.placed >= 10 ? '#10b981' : entry.placed >= 5 ? '#f59e0b' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="gov-funnel-detail" glow>
        <h3 className="section-title">PMKVY Funnel Breakdown</h3>
        <div className="gov-funnel-stages">
          {pmkvyFunnel.map((stage, i) => (
            <div key={stage.stage} className="gov-funnel-stage">
              <div className="gov-funnel-bar-wrap">
                <div
                  className="gov-funnel-bar"
                  style={{ width: `${(stage.candidates / 3.54) * 100}%`, backgroundColor: stage.fill }}
                />
              </div>
              <div className="gov-funnel-stage-info">
                <span className="gov-funnel-stage-name">{stage.stage}</span>
                <span className="gov-funnel-stage-value">{stage.candidates}M</span>
                <span className="gov-funnel-stage-pct">{((stage.candidates / 3.54) * 100).toFixed(1)}%</span>
              </div>
              {i < pmkvyFunnel.length - 1 && (
                <div className="gov-funnel-drop">
                  -{((1 - pmkvyFunnel[i + 1].candidates / stage.candidates) * 100).toFixed(1)}% drop
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
