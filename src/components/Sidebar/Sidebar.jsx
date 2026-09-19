import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHome, HiOutlineMap, HiOutlineLightBulb, HiOutlineCommandLine,
  HiOutlineCog, HiOutlineBriefcase, HiOutlineTrophy, HiOutlineChartBar,
  HiOutlineCheckBadge, HiOutlineUser,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { FaRocket, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/roadmap', label: 'Roadmap', icon: HiOutlineMap },
  { path: '/learn', label: 'Learn', icon: HiOutlineLightBulb },
  { path: '/practice', label: 'Practice', icon: HiOutlineCommandLine },
  { path: '/challenges', label: 'Challenges', icon: HiOutlineSparkles },
  { path: '/projects', label: 'Projects', icon: HiOutlineCog },
  { path: '/assessments', label: 'Assessments', icon: HiOutlineCheckBadge },
  { path: '/skill-analysis', label: 'Skill Analysis', icon: HiOutlineChartBar },
  { path: '/jobs', label: 'Jobs', icon: HiOutlineBriefcase },
  { path: '/leaderboard', label: 'Leaderboard', icon: HiOutlineTrophy },
];

const bottomItems = [
  { path: '/profile', label: 'Profile', icon: HiOutlineUser },
  { path: '/settings', label: 'Settings', icon: HiOutlineCog },
];

function SidebarLink({ item, onClose }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <NavLink to={item.path} className="sidebar-link" onClick={onClose}>
      <div className={`sidebar-link-inner ${isActive ? 'sidebar-link-inner--active' : ''}`}>
        {isActive && <div className="sidebar-active-bg" />}
        <item.icon className="sidebar-link-icon" />
        <span className="sidebar-link-label">{item.label}</span>
      </div>
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const { userName, logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-inner">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <FaRocket />
          </div>
          <span className="sidebar-logo-text">SkillQuest</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <SidebarLink key={item.path} item={item} onClose={onClose} />
          ))}
        </nav>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          {bottomItems.map((item) => (
            <SidebarLink key={item.path} item={item} onClose={onClose} />
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">{userName || 'User'}</span>
          <button className="sidebar-logout" onClick={logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
