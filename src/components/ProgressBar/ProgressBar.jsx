import './ProgressBar.css';

export default function ProgressBar({ value = 0, max = 100, color = 'var(--accent-purple)', height = 8, showLabel = false, animated = true }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track" style={{ height }}>
        <div
          className={`progress-bar-fill ${animated ? 'progress-bar-fill--animated' : ''}`}
          style={{
            width: `${percentage}%`,
            background: color,
            height,
          }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
