import { useState } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';
import { challenges } from '../../data/challengesData';
import './Challenges.css';

const filterTabs = [
  { id: 'All', label: 'All' },
  { id: 'Python', label: 'Python' },
  { id: 'DSA', label: 'DSA' },
  { id: 'SQL', label: 'SQL' },
  { id: 'Git', label: 'Git' },
  { id: 'Beginner', label: 'Beginner' },
  { id: 'Intermediate', label: 'Intermediate' },
  { id: 'Advanced', label: 'Advanced' },
];

export default function Challenges() {
  const [filter, setFilter] = useState('All');

  const filtered = challenges.filter((c) => {
    if (filter === 'All') return true;
    return c.category === filter || c.difficulty === filter;
  });

  return (
    <div className="page-container challenges-page">
      <div>
        <h1 className="page-title">Coding Challenges</h1>
        <p className="page-subtitle">Sharpen your skills with hands-on coding challenges</p>
      </div>

      <Tabs tabs={filterTabs} activeTab={filter} onTabChange={setFilter} />

      <div className="challenges-grid">
        {filtered.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="challenges-empty">
          <p>No challenges found for this filter.</p>
        </div>
      )}
    </div>
  );
}
