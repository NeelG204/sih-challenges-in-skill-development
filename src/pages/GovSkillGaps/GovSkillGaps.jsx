import { FaExclamationTriangle, FaShieldAlt, FaCode } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import Card from '../../components/Card/Card';
import StatCard from '../../components/StatCard/StatCard';
import { skillDemandSupplyGap, topSkillGaps, technicalSkillsPriority } from '../../data/governmentData';
import './GovSkillGaps.css';

const tooltipStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  fontSize: '0.8rem',
};

export default function GovSkillGaps() {
  return (
    <div className="page-container gov-skill-gaps">
      <div>
        <h1 className="page-title">Skill Gap Analysis</h1>
        <p className="page-subtitle">Demand vs supply across critical technology roles</p>
      </div>

      <div className="gov-gap-stats">
        <StatCard icon={<FaExclamationTriangle />} value="93%" label="Cybersecurity Gap" color="#ef4444" />
        <StatCard icon={<FaShieldAlt />} value="68%" label="ML/DevOps Gap" color="#f59e0b" />
        <StatCard icon={<FaCode />} value="51%" label="AI & Data Sci. Gap" color="var(--accent-purple)" />
      </div>

      <div className="gov-gap-grid">
        <Card className="gov-chart-card" glow>
          <h3 className="section-title">Demand-Supply Gap by Role</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillDemandSupplyGap} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="role" stroke="var(--text-muted)" fontSize={11} angle={-20} textAnchor="end" height={50} />
                <YAxis stroke="var(--text-muted)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="gap" radius={[6, 6, 0, 0]} barSize={36} name="Gap %">
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
          <h3 className="section-title">Employer-Reported Skill Gaps in Graduates</h3>
          <div className="gov-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSkillGaps} layout="vertical" margin={{ top: 10, right: 30, left: 110, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                <XAxis type="number" stroke="var(--text-muted)" fontSize={12} domain={[0, 70]} />
                <YAxis type="category" dataKey="skill" stroke="var(--text-muted)" fontSize={11} width={105} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={22} name="% Employers">
                  {topSkillGaps.map((entry) => (
                    <Cell
                      key={entry.skill}
                      fill={entry.percentage >= 50 ? '#ef4444' : entry.percentage >= 35 ? '#f59e0b' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="gov-skills-table-card" glow>
        <h3 className="section-title">Technical Skills — Industry Priority & Pay Scale</h3>
        <div className="gov-skills-table-wrap">
          <table className="gov-skills-table">
            <thead>
              <tr>
                <th>Skill Area</th>
                <th>Entry-Level Pay</th>
                <th>Time to Build</th>
                <th>Demand Score</th>
              </tr>
            </thead>
            <tbody>
              {technicalSkillsPriority.map((skill) => (
                <tr key={skill.skill}>
                  <td className="gov-skill-name">{skill.skill}</td>
                  <td>{skill.pay}</td>
                  <td>{skill.timeToBuild}</td>
                  <td>
                    <div className="gov-demand-bar-wrap">
                      <div
                        className="gov-demand-bar"
                        style={{
                          width: `${skill.demandScore * 10}%`,
                          backgroundColor: skill.demandScore >= 9 ? '#10b981' : skill.demandScore >= 7 ? '#f59e0b' : '#3b82f6',
                        }}
                      />
                      <span className="gov-demand-score">{skill.demandScore}/10</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
