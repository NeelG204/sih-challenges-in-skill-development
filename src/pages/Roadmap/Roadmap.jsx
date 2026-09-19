import { useState, useRef, useEffect, useCallback } from 'react';
import { roadmapStages, categoryColors } from '../../data/roadmapData';
import RoadmapNode from '../../components/RoadmapNode/RoadmapNode';
import Tabs from '../../components/Tabs/Tabs';
import Card from '../../components/Card/Card';
import './Roadmap.css';

const viewTabs = [
  { id: 'roadmap', label: 'Roadmap View' },
  { id: 'list', label: 'List View' },
];

const rows = [
  { id: 0, stages: ['start', 1, 2, 3], dir: 'ltr' },
  { id: 1, stages: ['4a', '4b'], dir: 'rtl' },
  { id: 2, stages: ['pass', 'complete'], dir: 'ltr' },
  { id: 3, stages: [5, 6, 'goal'], dir: 'ltr' },
];

const connections = [
  ['start', 1], [1, 2], [2, 3],
  [3, '4a'], [3, '4b'],
  ['4a', 'pass'], ['4b', 'complete'],
  ['pass', 5], ['complete', 5],
  [5, 6], [6, 'goal'],
];

function PathGuide() {
  const guide = [
    { color: '#3b82f6', label: 'Learn', desc: 'Build knowledge' },
    { color: '#10b981', label: 'Practice', desc: 'Apply & Improve' },
    { color: '#f59e0b', label: 'Assess', desc: 'Test & Verify' },
    { color: '#a855f7', label: 'Create', desc: 'Build & Showcase' },
    { color: '#06b6d4', label: 'Achieve', desc: 'Reach your Goal' },
  ];

  return (
    <div className="path-guide">
      <h3 className="path-guide-title">PATH GUIDE</h3>
      {guide.map((g) => (
        <div key={g.label} className="path-guide-row">
          <span className="path-guide-dot" style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
          <div className="path-guide-text">
            <span className="path-guide-label">{g.label}</span>
            <span className="path-guide-desc">{g.desc}</span>
          </div>
        </div>
      ))}
      <div className="path-guide-footer">
        <span className="path-guide-arrow">›</span> Your Learning Journey
      </div>
    </div>
  );
}

export default function Roadmap() {
  const [view, setView] = useState('roadmap');
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [lines, setLines] = useState([]);

  const measureLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = [];

    connections.forEach(([fromId, toId]) => {
      const fromEl = nodeRefs.current[fromId];
      const toEl = nodeRefs.current[toId];
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const fromCx = fromRect.left + fromRect.width / 2 - containerRect.left;
      const fromCy = fromRect.top + fromRect.height / 2 - containerRect.top;
      const toCx = toRect.left + toRect.width / 2 - containerRect.left;
      const toCy = toRect.top + toRect.height / 2 - containerRect.top;

      const fromStage = roadmapStages.find((s) => s.id === fromId);
      const color = fromStage ? categoryColors[fromStage.category]?.color : '#3b82f6';

      newLines.push({ fromId, toId, x1: fromCx, y1: fromCy, x2: toCx, y2: toCy, color });
    });

    setLines(newLines);
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureLines, 100);
    window.addEventListener('resize', measureLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureLines);
    };
  }, [measureLines, view]);

  return (
    <div className="page-container roadmap-page">
      <div className="roadmap-header">
        <div>
          <h1 className="page-title">Your Roadmap</h1>
          <p className="page-subtitle">From Python 3/10 to 8/10</p>
        </div>
        <Tabs tabs={viewTabs} activeTab={view} onTabChange={setView} />
      </div>

      {view === 'roadmap' ? (
        <div className="roadmap-layout">
          <PathGuide />
          <div className="roadmap-spath" ref={containerRef}>
            <svg className="roadmap-connectors" width="100%" height="100%">
              <defs>
                {lines.map((l, i) => (
                  <filter key={`glow-${i}`} id={`glow-${i}`}>
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>
              {lines.map((l, i) => (
                <g key={`conn-${i}`}>
                  <line
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={l.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter={`url(#glow-${i})`}
                    opacity="0.7"
                  />
                  <line
                    x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={l.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </g>
              ))}
            </svg>

            {rows.map((row) => (
              <div
                key={row.id}
                className={`rm-row rm-row--${row.dir}`}
              >
                {row.stages.map((stageId) => {
                  const stage = roadmapStages.find((s) => s.id === stageId);
                  if (!stage) return null;
                  return (
                    <div
                      key={stageId}
                      className="rm-row-node"
                      ref={(el) => { nodeRefs.current[stageId] = el; }}
                    >
                      <RoadmapNode stage={stage} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="roadmap-list">
          {roadmapStages.map((stage) => (
            <Card key={stage.id} className="roadmap-list-item" glow>
              <div className="list-item-left">
                <span className={`list-item-status list-item-status--${stage.status}`}>
                  {stage.status === 'completed' ? '✓' : stage.status === 'current' ? '▶' : stage.status === 'milestone' ? '★' : '🔒'}
                </span>
                <div>
                  <h3 className="list-item-title">{stage.title}</h3>
                  <p className="list-item-subtitle">{stage.subtitle}</p>
                </div>
              </div>
              <div className="list-item-right">
                {stage.xp && <span className="list-item-xp">XP: {stage.xp}</span>}
                <span className={`list-item-badge list-item-badge--${stage.status}`}>
                  {stage.status.replace('-', ' ')}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
