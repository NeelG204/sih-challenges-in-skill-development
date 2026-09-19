import { Link } from 'react-router-dom';
import { FaRocket, FaGoogle, FaMicrosoft, FaRoute, FaCode, FaBriefcase, FaChartLine, FaGithub,
  FaUserTie, FaSearch, FaCheckCircle, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const features = [
  {
    icon: <FaRoute />,
    title: 'Skill Roadmap',
    description: 'Follow personalized learning paths tailored to your career goals and track your progress.',
    color: 'var(--accent-purple)',
  },
  {
    icon: <FaCode />,
    title: 'Coding Challenges',
    description: 'Sharpen your skills with real-world coding challenges and compete on the leaderboard.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: <FaBriefcase />,
    title: 'Job Matching',
    description: 'Get matched with opportunities that fit your skills. Employers find you, you find them.',
    color: 'var(--accent-green)',
  },
  {
    icon: <FaChartLine />,
    title: 'Skill Analysis',
    description: 'Deep insights into your strengths and gaps with AI-powered skill assessments.',
    color: 'var(--accent-yellow)',
  },
];

export default function Home() {
  const { theme, toggleTheme } = useAuth();

  return (
    <div className="home-page">
      <nav className="home-navbar">
        <div className="home-navbar-inner">
          <Link to="/" className="home-logo">
            <FaRocket className="home-logo-icon" />
            <span className="home-logo-text">SkillQuest</span>
          </Link>

          <div className="home-nav-links">
            <a href="#features" className="home-nav-link">Features</a>
            <Link to="/login" className="home-nav-link">Jobs</Link>
            <Link to="/login" className="home-nav-link">Learning</Link>
            <a href="#about" className="home-nav-link">About</a>
          </div>

          <div className="home-nav-actions">
            <button className="home-theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/signup" className="home-nav-join">Join now</Link>
            <Link to="/login" className="home-nav-signin">Sign in</Link>
          </div>
        </div>
      </nav>

      <section className="home-hero">
        <video className="home-hero-video home-hero-video--dark" autoPlay muted loop playsInline>
          <source src="/video_text_removed.mp4" type="video/mp4" />
        </video>
        <video className="home-hero-video home-hero-video--light" autoPlay muted loop playsInline>
          <source src="/video_theme_bg.mp4" type="video/mp4" />
        </video>
        <div className="home-hero-inner">
          <div className="home-hero-content">
            <h1 className="home-hero-title">
              Level up your career with <span className="home-hero-highlight">SkillQuest</span>
            </h1>
            <p className="home-hero-subtitle">
              Build skills, solve challenges, and connect with opportunities.
              Your journey to becoming job-ready starts here.
            </p>

            <div className="home-hero-buttons">
              <button className="home-social-btn home-social-btn--google" type="button">
                <FaGoogle /> Continue with Google
              </button>
              <button className="home-social-btn home-social-btn--microsoft" type="button">
                <FaMicrosoft /> Continue with Microsoft
              </button>
              <Link to="/login" className="home-email-btn">
                Sign in with email
              </Link>
            </div>

            <p className="home-hero-terms">
              By clicking Continue to join or sign in, you agree to SkillQuest's{' '}
              <a href="#">User Agreement</a>,<br/> <a href="#">Privacy Policy</a>, and, <a href="#">Cookie Policy</a>.
            </p>

            <p className="home-hero-signup">
              New to SkillQuest? <Link to="/signup">Join now</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="home-features" id="features">
        <div className="home-features-inner">
          <h2 className="home-features-title">Everything you need to succeed</h2>
          <p className="home-features-subtitle">
            SkillQuest brings together learning, practice, and opportunities in one platform.
          </p>
          <div className="home-features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="home-feature-card">
                <div className="home-feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="home-feature-title">{feature.title}</h3>
                <p className="home-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-about" id="about">
        <div className="home-about-inner">
          <div className="home-about-header">
            <h2 className="home-about-title">Our Mission</h2>
            <p className="home-about-text">
              SkillQuest bridges the gap between learning and employment. We believe everyone
              deserves a clear path to their dream career. Our platform combines skill assessments,
              personalized roadmaps, and direct job matching to connect talent with opportunity —
              whether you're looking for your next role or your next great hire.
            </p>
          </div>

          <div className="home-how-it-works">
            <h3 className="home-how-title">How It Works</h3>
            <div className="home-how-grid">
              <div className="home-how-column">
                <div className="home-how-column-header home-how-column-header--seeker">
                  <FaUserTie />
                  <span>For Job Seekers</span>
                </div>
                <div className="home-how-steps">
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaUserTie /></div>
                    <div className="home-how-step-content">
                      <h4>Build Your Profile</h4>
                      <p>Showcase your skills, experience, and achievements in a professional profile.</p>
                    </div>
                  </div>
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaRoute /></div>
                    <div className="home-how-step-content">
                      <h4>Follow Your Roadmap</h4>
                      <p>Get a personalized learning path tailored to your career goals.</p>
                    </div>
                  </div>
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaBriefcase /></div>
                    <div className="home-how-step-content">
                      <h4>Get Hired</h4>
                      <p>Apply to matched opportunities and land your dream job.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="home-how-column">
                <div className="home-how-column-header home-how-column-header--giver">
                  <FaBriefcase />
                  <span>For Job Givers</span>
                </div>
                <div className="home-how-steps">
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaSearch /></div>
                    <div className="home-how-step-content">
                      <h4>Post a Job</h4>
                      <p>Describe your role and requirements to attract the right talent.</p>
                    </div>
                  </div>
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaCheckCircle /></div>
                    <div className="home-how-step-content">
                      <h4>Get Matched</h4>
                      <p>Our AI matches you with candidates who fit your needs.</p>
                    </div>
                  </div>
                  <div className="home-how-step">
                    <div className="home-how-step-icon"><FaCode /></div>
                    <div className="home-how-step-content">
                      <h4>Hire Top Talent</h4>
                      <p>Review applicants, assess skills, and make your hire.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer" id="footer">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <Link to="/" className="home-footer-logo">
              <FaRocket className="home-footer-logo-icon" />
              <span>SkillQuest</span>
            </Link>
            <p className="home-footer-tagline">Level up your career</p>
          </div>

          <div className="home-footer-links">
            <div className="home-footer-col">
              <h4>Platform</h4>
              <Link to="/login">Features</Link>
              <Link to="/login">Learning</Link>
              <Link to="/login">Challenges</Link>
              <Link to="/login">Jobs</Link>
            </div>
            <div className="home-footer-col">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="home-footer-col">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="home-footer-bottom">
          <p>&copy; 2026 SkillQuest. All rights reserved.</p>
          <div className="home-footer-social">
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
