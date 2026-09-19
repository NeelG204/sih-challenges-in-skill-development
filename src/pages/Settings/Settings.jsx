import { useState } from 'react';
import Card from '../../components/Card/Card';
import { useAuth } from '../../context/AuthContext';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Settings.css';

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  );
}

function Dropdown({ value, onChange, options }) {
  return (
    <select className="settings-dropdown" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export default function Settings() {
  const { userEmail, theme, toggleTheme, logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotif: true,
    pushNotif: false,
    language: 'en',
    profilePublic: true,
    showXp: true,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleDeleteAccount = () => {
    localStorage.removeItem('skillquest_users');
    logout();
  };

  return (
    <div className="page-container settings-page">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences</p>
      </div>

      <Card className="settings-section" glow>
        <h3 className="settings-section-title">Account</h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Email</span>
            <span className="settings-label-desc">Your registered email address</span>
          </div>
          <input
            type="email"
            className="settings-input"
            value={userEmail}
            readOnly
          />
        </div>
      </Card>

      <Card className="settings-section" glow>
        <h3 className="settings-section-title">Notifications</h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Enable Notifications</span>
            <span className="settings-label-desc">Receive in-app notifications</span>
          </div>
          <Toggle checked={settings.notifications} onChange={(v) => update('notifications', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Email Notifications</span>
            <span className="settings-label-desc">Receive email updates</span>
          </div>
          <Toggle checked={settings.emailNotif} onChange={(v) => update('emailNotif', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Push Notifications</span>
            <span className="settings-label-desc">Receive push notifications on mobile</span>
          </div>
          <Toggle checked={settings.pushNotif} onChange={(v) => update('pushNotif', v)} />
        </div>
      </Card>

      <Card className="settings-section" glow>
        <h3 className="settings-section-title">Appearance</h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Dark Mode</span>
            <span className="settings-label-desc">Use dark theme</span>
          </div>
          <Toggle checked={theme === 'dark'} onChange={() => toggleTheme()} />
        </div>
      </Card>

      <Card className="settings-section" glow>
        <h3 className="settings-section-title">Privacy</h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Public Profile</span>
            <span className="settings-label-desc">Allow others to see your profile</span>
          </div>
          <Toggle checked={settings.profilePublic} onChange={(v) => update('profilePublic', v)} />
        </div>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Show XP on Profile</span>
            <span className="settings-label-desc">Display XP publicly</span>
          </div>
          <Toggle checked={settings.showXp} onChange={(v) => update('showXp', v)} />
        </div>
      </Card>

      <Card className="settings-section" glow>
        <h3 className="settings-section-title">Language</h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Preferred Language</span>
            <span className="settings-label-desc">Select your language</span>
          </div>
          <Dropdown
            value={settings.language}
            onChange={(v) => update('language', v)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'hi', label: 'Hindi' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
            ]}
          />
        </div>
      </Card>

      <Card className="settings-section settings-section--danger" glow>
        <h3 className="settings-section-title">
          Manage Account
        </h3>
        <div className="settings-row">
          <div className="settings-label">
            <span className="settings-label-text">Delete Account</span>
            <span className="settings-label-desc">
              Permanently delete your account and all associated data. This action cannot be undone.
            </span>
          </div>
          <button
            className="settings-delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </Card>

      {showDeleteModal && (
        <div className="settings-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-modal-icon"><FaExclamationTriangle /></div>
            <h3 className="settings-modal-title">Delete Account?</h3>
            <p className="settings-modal-text">
              This will permanently delete your account and all data. This cannot be undone.
            </p>
            <div className="settings-modal-actions">
              <button
                className="settings-modal-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="settings-modal-delete"
                onClick={handleDeleteAccount}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
