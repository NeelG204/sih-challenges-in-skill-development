import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import GiverDashboard from './pages/GiverDashboard/GiverDashboard';
import Roadmap from './pages/Roadmap/Roadmap';
import LevelDetails from './pages/LevelDetails/LevelDetails';
import Challenges from './pages/Challenges/Challenges';
import ChallengeDetails from './pages/ChallengeDetails/ChallengeDetails';
import SkillAnalysis from './pages/SkillAnalysis/SkillAnalysis';
import Learn from './pages/Learn/Learn';
import Practice from './pages/Practice/Practice';
import Projects from './pages/Projects/Projects';
import Assessments from './pages/Assessments/Assessments';
import Jobs from './pages/Jobs/Jobs';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import PostJob from './pages/PostJob/PostJob';
import MyListings from './pages/MyListings/MyListings';
import Applicants from './pages/Applicants/Applicants';
import Messages from './pages/Messages/Messages';
import GiverAnalytics from './pages/GiverAnalytics/GiverAnalytics';
import GovDashboard from './pages/GovDashboard/GovDashboard';
import GovSchemes from './pages/GovSchemes/GovSchemes';
import GovSkillGaps from './pages/GovSkillGaps/GovSkillGaps';
import GovInstitutions from './pages/GovInstitutions/GovInstitutions';
import GovHiring from './pages/GovHiring/GovHiring';

function AppRoutes() {
  const { isLoggedIn, userRole } = useAuth();

  const getDashboardPath = () => {
    if (!isLoggedIn) return '/login';
    if (!userRole) return '/signup';
    if (userRole === 'government') return '/gov-dashboard';
    return userRole === 'giver' ? '/giver-dashboard' : '/dashboard';
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn
            ? <Navigate to={getDashboardPath()} replace />
            : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isLoggedIn && userRole
            ? <Navigate to={getDashboardPath()} replace />
            : <SignUp />
        }
      />
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Layout />
            : <Home />
        }
      >
        <Route index element={
          isLoggedIn ? <Navigate to={getDashboardPath()} replace /> : null
        } />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="giver-dashboard" element={<GiverDashboard />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="levels/:id" element={<LevelDetails />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="challenges/:slug" element={<ChallengeDetails />} />
        <Route path="skill-analysis" element={<SkillAnalysis />} />
        <Route path="learn" element={<Learn />} />
        <Route path="practice" element={<Practice />} />
        <Route path="projects" element={<Projects />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="my-listings" element={<MyListings />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="messages" element={<Messages />} />
        <Route path="giver-analytics" element={<GiverAnalytics />} />
        <Route path="gov-dashboard" element={<GovDashboard />} />
        <Route path="gov-schemes" element={<GovSchemes />} />
        <Route path="gov-skill-gaps" element={<GovSkillGaps />} />
        <Route path="gov-institutions" element={<GovInstitutions />} />
        <Route path="gov-hiring" element={<GovHiring />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
