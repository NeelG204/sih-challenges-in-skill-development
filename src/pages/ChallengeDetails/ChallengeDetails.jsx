import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaPaperPlane, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import Badge from '../../components/Badge/Badge';
import Tabs from '../../components/Tabs/Tabs';
import Button from '../../components/Button/Button';
import { challenges } from '../../data/challengesData';
import './ChallengeDetails.css';

const tabItems = [
  { id: 'problem', label: 'Problem Statement' },
  { id: 'instructions', label: 'Instructions' },
  { id: 'resources', label: 'Resources' },
  { id: 'submissions', label: 'Submissions' },
];

export default function ChallengeDetails() {
  const { slug } = useParams();
  const challenge = useMemo(() => challenges.find((c) => c.slug === slug) || challenges[0], [slug]);
  const [activeTab, setActiveTab] = useState('problem');
  const [code, setCode] = useState(challenge.defaultCode || '');
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1500);
  };

  const handleSubmit = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setSubmitted(true);
    }, 2000);
  };

  const passedCount = challenge.testCases.filter((t) => t.passed).length;

  return (
    <div className="page-container challenge-details">
      <div className="challenge-header">
        <div>
          <h1 className="page-title">Challenge: {challenge.title}</h1>
          <div className="challenge-meta">
            <Badge variant="yellow">{challenge.category}</Badge>
            <Badge variant="cyan">{challenge.difficulty}</Badge>
            <span className="challenge-timer">⏱ {challenge.timer.days}d : {challenge.timer.hours}h left</span>
          </div>
        </div>
      </div>

      <Tabs tabs={tabItems} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'problem' && (
        <div className="challenge-problem">
          <Card className="problem-statement">
            <h3>Problem Statement</h3>
            <p>{challenge.description}</p>
            <ul className="problem-requirements">
              {challenge.requirements.map((req) => (
                <li key={req}>
                  <FaCheckCircle className="req-icon req-icon--green" />
                  {req}
                </li>
              ))}
            </ul>
          </Card>

          <div className="challenge-workspace">
            <div className="code-editor-section">
              <div className="editor-header">
                <span className="editor-title">📝 Your Submission</span>
                <Badge variant="purple">Python</Badge>
              </div>
              <div className="code-editor">
                <div className="editor-line-numbers">
                  {code.split('\n').map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>
                <textarea
                  className="code-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="editor-actions">
                <Button
                  variant="secondary"
                  icon={<FaPlay />}
                  onClick={handleRun}
                  disabled={running}
                >
                  {running ? 'Running...' : 'Run Code'}
                </Button>
                <Button
                  variant="primary"
                  icon={<FaPaperPlane />}
                  onClick={handleSubmit}
                  disabled={running}
                >
                  {running && !submitted ? 'Submitting...' : 'Submit Solution'}
                </Button>
              </div>
            </div>

            <div className="test-cases-section">
              <Card className="test-cases-card">
                <div className="test-cases-header">
                  <h3>Test Cases</h3>
                  <span className={`test-cases-count ${passedCount === challenge.testCases.length ? 'test-cases-count--pass' : ''}`}>
                    {passedCount}/{challenge.testCases.length} Passed
                  </span>
                </div>
                <div className="test-cases-list">
                  {challenge.testCases.map((tc) => (
                    <div key={tc.name} className={`test-case ${tc.passed ? 'test-case--passed' : 'test-case--failed'}`}>
                      {tc.passed ? (
                        <FaCheckCircle className="test-case-icon test-case-icon--pass" />
                      ) : (
                        <FaTimesCircle className="test-case-icon test-case-icon--fail" />
                      )}
                      <span>{tc.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'instructions' && (
        <Card className="challenge-tab-content">
          <h3>Instructions</h3>
          <ol className="instructions-list">
            <li>Read the problem statement carefully.</li>
            <li>Implement the solution in the code editor.</li>
            <li>Click "Run Code" to test your solution locally.</li>
            <li>Make sure all test cases pass.</li>
            <li>Click "Submit Solution" when ready.</li>
          </ol>
        </Card>
      )}

      {activeTab === 'resources' && (
        <Card className="challenge-tab-content">
          <h3>Resources</h3>
          <div className="resources-list">
            <a href="#" className="resource-link">📖 Python Documentation</a>
            <a href="#" className="resource-link">🎥 Video Tutorial: File Handling</a>
            <a href="#" className="resource-link">📝 Practice: JSON in Python</a>
          </div>
        </Card>
      )}

      {activeTab === 'submissions' && (
        <Card className="challenge-tab-content">
          <h3>Submissions</h3>
          {submitted ? (
            <div className="submission-success">
              <FaCheckCircle className="submission-icon" />
              <p>Solution submitted successfully!</p>
            </div>
          ) : (
            <p className="no-submissions">No submissions yet. Write your code and submit!</p>
          )}
        </Card>
      )}
    </div>
  );
}
