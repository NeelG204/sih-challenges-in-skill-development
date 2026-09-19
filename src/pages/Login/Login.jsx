import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const name = email.split('@')[0];
      login(name, email);
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-bg-shapes">
        <div className="login-shape login-shape--1" />
        <div className="login-shape login-shape--2" />
        <div className="login-shape login-shape--3" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <FaRocket className="login-logo-icon" />
          </div>
          <h1 className="login-title">SkillQuest</h1>
          <p className="login-subtitle">Level up your career</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <FaEnvelope className="login-field-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="login-field">
            <FaLock className="login-field-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="button" className="login-toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-forgot">Forgot password?</a>
          </div>

          <button
            type="submit"
            className={`login-button ${loading ? 'login-button--loading' : ''}`}
            disabled={loading}
          >
            {loading ? <span className="login-button-spinner" /> : 'Sign In'}
          </button>
        </form>

        <div className="login-divider">
          <span>or continue with</span>
        </div>

        <div className="login-social">
          <button className="login-social-btn">
            <FaGoogle /> <span>Google</span>
          </button>
          <button className="login-social-btn">
            <FaGithub /> <span>GitHub</span>
          </button>
        </div>

        <p className="login-signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
