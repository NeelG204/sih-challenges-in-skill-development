import { FaChartLine, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, Cell,
} from 'recharts';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import { jobspeakIndex, hiringGrowth2026, branchEnrollment, seatFillRate } from '../../data/governmentData';
import './GovHiring.css';

const tooltipStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.8rem',
};

export default function GovHiring() {
  return (
    <div className="page-container gov-hiring">
      <div>
        <h1 className="page-title">Hiring Trends</h1>
        <p className="page-subtitle">Job market indices and sector hiring patterns</p>
      </div>

      <div className="gov-hiring-stats">
        <StatCard icon={<FaChartLine />} value="3,028" label="Naukri JobSpeak (Aug '26)" color="var(--accent-purple)" />
        <StatCard icon={<FaArrowUp />} value="+34%" label="AI/ML YoY Growth" color="var(--accent-green)" />
        <StatCard icon={<FaArrowDown />} value="-3%" label="IT Sector (Jun '26)" color="#ef4444" />
        <StatCard icon={<FaMinus />} value="75.07%" label="Seat Fill Rate" color="var(--accent-cyan)" />
      </div>

      <div className="gov-hiring-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Naukri JobSpeak Index — 2025 vs 2026</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobspeakIndex} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[2400, 3400]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Line type="monotone" dataKey="y2025" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="2025" />
                <Line type="monotone" dataKey="y2026" stroke="#a855f7" strokeWidth={3} dot={{ r: 5 }} name="2026" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">AI/ML vs IT Sector Hiring (2026 YoY %)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringGrowth2026} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                <Bar dataKey="aiML" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={22} name="AI/ML Roles" />
                <Bar dataKey="itSector" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={22} name="IT Sector" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="gov-hiring-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Branch-wise B.Tech Enrollment (2024-25)</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={branchEnrollment} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="branch" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => value.toLocaleString()} />
                <Bar dataKey="enrollment" radius={[6, 6, 0, 0]} barSize={36} name="Students">
                  {branchEnrollment.map((entry, i) => (
                    <Cell
                      key={entry.branch}
                      fill={['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="gov-chart-card" glow>
          <h3 className="section-title">National Seat-Fill Rate Trend</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={seatFillRate} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[40, 85]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  fill="#10b98120"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                  name="% Filled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
