import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [userExperienceLevel, setUserExperienceLevel] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const login = (name, email) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserEmail(email);
    const users = JSON.parse(localStorage.getItem('skillquest_users') || '{}');
    const user = users[email];
    if (user) {
      setUserRole(user.role);
      setUserSkills(user.skills || []);
      setUserExperienceLevel(user.experienceLevel || '');
    }
  };

  const signUp = (role, name, email, skills = [], experienceLevel = '') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
    setUserSkills(skills);
    setUserExperienceLevel(experienceLevel);
    const users = JSON.parse(localStorage.getItem('skillquest_users') || '{}');
    users[email] = { name, role, email, skills, experienceLevel };
    localStorage.setItem('skillquest_users', JSON.stringify(users));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setUserEmail('');
    setUserSkills([]);
    setUserExperienceLevel('');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, userRole, userName, userEmail, userSkills, userExperienceLevel,
        theme, login, signUp, logout, toggleTheme,
        setIsLoggedIn, setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
