import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import GiverSidebar from '../GiverSidebar/GiverSidebar';
import GovernmentSidebar from '../GovernmentSidebar/GovernmentSidebar';
import TopBar from '../TopBar/TopBar';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

export default function Layout() {
  const { userRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSidebar = () => {
    if (userRole === 'government') {
      return <GovernmentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
    }
    if (userRole === 'giver') {
      return <GiverSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
    }
    return <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />;
  };

  return (
    <div className="layout">
      {renderSidebar()}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
      <div className="layout-main">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
