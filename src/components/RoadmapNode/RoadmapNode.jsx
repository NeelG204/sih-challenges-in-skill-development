import { useNavigate } from 'react-router-dom';
import { FaUser, FaBook, FaPlay, FaClipboardList, FaStar, FaFlask, FaTrophy, FaCheck, FaMedal, FaRocket, FaGraduationCap, FaLock, FaCheckCircle } from 'react-icons/fa';
import { categoryColors } from '../../data/roadmapData';
import './RoadmapNode.css';

const iconMap = {
  person: FaUser,
  book: FaBook,
  play: FaPlay,
  clipboard: FaClipboardList,
  star: FaStar,
  flask: FaFlask,
  trophy: FaTrophy,
  check: FaCheck,
  medal: FaMedal,
  rocket: FaRocket,
  graduation: FaGraduationCap,
};

export default function RoadmapNode({ stage }) {
  const navigate = useNavigate();
  const colors = categoryColors[stage.category] || categoryColors.learn;
  const Icon = iconMap[stage.icon] || FaBook;
  const isCompleted = stage.status === 'completed';
  const isLocked = stage.status === 'locked';
  const isCurrent = stage.status === 'current';

  const handleClick = () => {
    if (stage.id === 'start' || stage.id === 'pass' || stage.id === 'complete' || stage.id === 'goal') return;
    navigate(`/levels/${stage.id}`);
  };

  return (
    <div
      className={`rm-node rm-node--${stage.shape} rm-node--${stage.status}`}
      style={{
        '--node-color': colors.color,
        '--node-glow': colors.glow,
        '--node-bg': colors.bg,
        '--node-border': colors.border,
      }}
      onClick={handleClick}
    >
      <div className={`rm-node-icon-wrap rm-node-icon-wrap--${stage.shape}`}>
        {isLocked ? (
          <FaLock className="rm-node-icon rm-node-icon--locked" />
        ) : (
          <Icon className="rm-node-icon" />
        )}
      </div>
      <div className="rm-node-label">
        <span className="rm-node-title">{stage.title}</span>
        <span className="rm-node-subtitle">{stage.subtitle}</span>
      </div>
      {isCompleted && (
        <div className="rm-node-check">
          <FaCheckCircle />
        </div>
      )}
      {isCurrent && <div className="rm-node-pulse" />}
    </div>
  );
}
