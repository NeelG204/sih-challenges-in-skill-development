import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHome, HiOutlineBriefcase, HiOutlineCog,
  HiOutlineChartBar, HiOutlineUser,
} from 'react-icons/hi2';
import { HiOutlineClipboardDocumentList, HiOutlineUsers, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { FaRocket, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './GiverSidebar.css';

const navItems = [
  { path: '/giver-dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/post-job', label: 'Post Job', icon: HiOutlineBriefcase },
  { path: '/my-listings', label: 'My Listings', icon: HiOutlineClipboardDocumentList },
  { path: '/applicants', label: 'Applicants', icon: HiOutlineUsers },
  { path: '/messages', label: 'Messages', icon: HiOutlineChatBubbleLeftRight },
  { path: '/giver-analytics', label: 'Analytics', icon: HiOutlineChartBar },
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

export default function GiverSidebar({ isOpen, onClose }) {
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
          <div className="sidebar-footer-company">
            <span className="sidebar-footer-company-name">{userName || 'Company'}</span>
            <span className="sidebar-footer-verified">
              <FaCheckCircle /> Verified
            </span>
          </div>
          <button className="sidebar-logout" onClick={logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
