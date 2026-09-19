import './CircularProgress.css';

export default function CircularProgress({ value = 0, size = 80, strokeWidth = 6, color = 'var(--accent-purple)', label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="circular-progress-circle"
        />
      </svg>
      <div className="circular-progress-text">
        {label && <span className="circular-progress-value">{label}</span>}
        {sublabel && <span className="circular-progress-sublabel">{sublabel}</span>}
      </div>
    </div>
  );
}
