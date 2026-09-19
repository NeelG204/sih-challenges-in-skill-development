import CircularProgress from '../../components/CircularProgress/CircularProgress';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Button from '../../components/Button/Button';
import { performanceMetrics, careerDNA } from '../../data/userData';
import './SkillAnalysis.css';

export default function SkillAnalysis() {
  return (
    <div className="page-container skill-analysis">
      <div>
        <h1 className="page-title">Skill Analysis</h1>
        <p className="page-subtitle">Analyze your performance and improve</p>
      </div>

      <div className="performance-grid">
        {performanceMetrics.map((metric) => (
          <div key={metric.label} className="performance-card">
            <Card className="performance-card" glow>
              <CircularProgress
                value={metric.value}
                size={100}
                strokeWidth={8}
                color={metric.color}
                label={`${metric.value}%`}
              />
              <span className="performance-label">{metric.label}</span>
            </Card>
          </div>
        ))}
      </div>

      <Card className="recommendation-card" glow>
        <div className="recommendation-icon">🏆</div>
        <div className="recommendation-content">
          <h3>Improve Efficiency</h3>
          <p>Your program works but can be optimized. Learn about efficient data structures and algorithms.</p>
        </div>
        <Button variant="primary">Improve Now</Button>
      </Card>

      <div className="career-dna-section">
        <h2 className="section-title">Career DNA Match</h2>

        <div className="dna-comparison">
          <Card className="dna-card your-dna" glow>
            <div className="dna-visual">
              <CircularProgress
                value={careerDNA.yourMatch}
                size={120}
                strokeWidth={10}
                color="var(--accent-cyan)"
                label={`${careerDNA.yourMatch}%`}
                sublabel="Match"
              />
            </div>
            <span className="dna-label">Your DNA</span>
          </Card>

          <div className="dna-vs">
            <span className="dna-vs-text">VS</span>
            <div className="dna-helix">
              <span className="helix-strand helix-strand--1">🧬</span>
              <span className="helix-strand helix-strand--2">🧬</span>
            </div>
          </div>

          <Card className="dna-card target-dna" glow>
            <div className="dna-visual">
              <CircularProgress
                value={careerDNA.targetMatch}
                size={120}
                strokeWidth={10}
                color="var(--accent-purple)"
                label={`${careerDNA.targetMatch}%`}
                sublabel="Required"
              />
            </div>
            <span className="dna-label">{careerDNA.targetCompany}</span>
          </Card>
        </div>

        <div className="missing-genes">
          <h3 className="section-title">Top Missing Genes</h3>
          <div className="genes-tags">
            {careerDNA.missingGenes.map((gene) => (
              <Badge key={gene} variant="red">{gene}</Badge>
            ))}
          </div>
        </div>

        <div className="dna-recommendations">
          <h3 className="section-title">Recommendations</h3>
          <p className="dna-recommendations-sub">Focus on these areas to increase your match score</p>
          <div className="dna-skills-list">
            {careerDNA.recommendations.map((rec) => (
              <div key={rec.skill} className="dna-skill-row">
                <div className="dna-skill-info">
                  <span className="dna-skill-name">{rec.skill}</span>
                  <span className="dna-skill-progress">{rec.progress}%</span>
                </div>
                <ProgressBar
                  value={rec.progress}
                  color={rec.priority === 'high' ? 'var(--accent-red)' : rec.priority === 'medium' ? 'var(--accent-yellow)' : 'var(--accent-green)'}
                  height={6}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="dna-radar">
          <h3 className="section-title">Skill Radar</h3>
          <div className="radar-chart">
            <div className="radar-axis radar-axis--dsa">DSA</div>
            <div className="radar-axis radar-axis--cloud">Cloud</div>
            <div className="radar-axis radar-axis--testing">Testing</div>
            <div className="radar-axis radar-axis--oop">OOP</div>
            <div className="radar-axis radar-axis--dbms">DBMS</div>
            <div className="radar-axis radar-axis--sysdesign">System Design</div>
            <svg viewBox="0 0 200 200" className="radar-svg">
              <polygon points="100,20 180,80 150,170 50,170 20,80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <polygon points="100,40 160,85 140,155 60,155 40,85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <polygon points="100,60 140,90 130,140 70,140 60,90" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <polygon points="100,50 155,82 135,148 65,148 45,82" fill="rgba(124,58,237,0.15)" stroke="var(--accent-purple)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
