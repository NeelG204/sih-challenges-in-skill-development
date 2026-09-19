import { useState } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import Card from '../../components/Card/Card';
import { leaderboard } from '../../data/jobsData';
import './Leaderboard.css';

const filterTabs = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'alltime', label: 'All Time' },
];

const medals = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const [filter, setFilter] = useState('alltime');

  return (
    <div className="page-container leaderboard-page">
      <div>
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">See how you rank among other learners</p>
      </div>

      <Tabs tabs={filterTabs} activeTab={filter} onTabChange={setFilter} />

      <Card className="leaderboard-table">
        <div className="leaderboard-header-row">
          <span className="lb-col-rank">Rank</span>
          <span className="lb-col-name">Name</span>
          <span className="lb-col-level">Level</span>
          <span className="lb-col-xp">XP</span>
          <span className="lb-col-streak">Streak</span>
        </div>
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`leaderboard-row ${entry.isCurrentUser ? 'leaderboard-row--current' : ''} ${entry.rank <= 3 ? 'leaderboard-row--top' : ''}`}
          >
            <span className="lb-col-rank">
              {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
            </span>
            <span className="lb-col-name">
              <span className="lb-avatar">{entry.avatar}</span>
              {entry.name}
              {entry.isCurrentUser && <span className="lb-you">You</span>}
            </span>
            <span className="lb-col-level">Level {entry.level}</span>
            <span className="lb-col-xp">{entry.xp.toLocaleString()} XP</span>
            <span className="lb-col-streak">🔥 {entry.streak}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
