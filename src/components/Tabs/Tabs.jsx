import './Tabs.css';

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === (tab.id || tab.label);
        return (
          <button
            key={tab.id || tab.label}
            className={`tab ${isActive ? 'tab--active' : ''}`}
            onClick={() => onTabChange(tab.id || tab.label)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
