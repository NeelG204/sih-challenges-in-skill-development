import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiBars3, HiBell, HiMagnifyingGlass } from 'react-icons/hi2';
import { FaSun, FaMoon, FaUser, FaCog, FaSignOutAlt, FaRoute, FaChartLine, FaBriefcase } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './TopBar.css';

const notifications = [
  { id: 1, icon: <FaRoute />, text: 'New challenge available: Python Basics', time: '5 min ago', unread: true },
  { id: 2, icon: <FaChartLine />, text: 'Your skill analysis is ready', time: '1 hour ago', unread: true },
  { id: 3, icon: <FaBriefcase />, text: 'New job match: Frontend Developer', time: '3 hours ago', unread: false },
];

export default function TopBar({ onMenuClick }) {
  const { userName, userEmail, logout, theme, toggleTheme } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const initials = userName
    ? userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="topbar-menu" onClick={onMenuClick}>
          <HiBars3 />
        </button>

        <div className="topbar-search">
          <HiMagnifyingGlass className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            className="topbar-search-input"
          />
        </div>

        <div className="topbar-actions">
          <button className="topbar-icon-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <button
            className="topbar-icon-btn topbar-notification"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <HiBell />
            <span className="topbar-notification-badge">3</span>
          </button>
          {notificationsOpen && (
            <div className="topbar-notification-dropdown" ref={notificationsRef}>
              <div className="topbar-notification-header">
                <span className="topbar-notification-title">Notifications</span>
              </div>
              <div className="topbar-notification-divider" />
              {notifications.map((notif) => (
                <div key={notif.id} className={`topbar-notification-item ${notif.unread ? 'topbar-notification-item--unread' : ''}`}>
                  <div className="topbar-notification-icon">{notif.icon}</div>
                  <div className="topbar-notification-content">
                    <span className="topbar-notification-text">{notif.text}</span>
                    <span className="topbar-notification-time">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="topbar-avatar-wrapper" ref={dropdownRef}>
            <div className="topbar-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>{initials}</span>
            </div>
            {dropdownOpen && (
              <div className="topbar-dropdown">
                <div className="topbar-dropdown-header">
                  <div className="topbar-dropdown-avatar">{initials}</div>
                  <div className="topbar-dropdown-user">
                    <span className="topbar-dropdown-name">{userName || 'User'}</span>
                    <span className="topbar-dropdown-email">{userEmail || 'user@example.com'}</span>
                  </div>
                </div>
                <div className="topbar-dropdown-divider" />
                <button className="topbar-dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/profile'); }}>
                  <FaUser /> <span>Profile</span>
                </button>
                <button className="topbar-dropdown-item" onClick={() => { setDropdownOpen(false); navigate('/settings'); }}>
                  <FaCog /> <span>Settings</span>
                </button>
                <div className="topbar-dropdown-divider" />
                <button className="topbar-dropdown-item topbar-dropdown-logout" onClick={handleLogout}>
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
