import { useState } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import CourseCard from '../../components/CourseCard/CourseCard';
import { courses, categories } from '../../data/coursesData';
import './Learn.css';

const categoryTabs = categories.map((c) => ({ id: c, label: c }));

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="page-container learn-page">
      <div>
        <h1 className="page-title">Learning Library</h1>
        <p className="page-subtitle">Explore courses across multiple skills</p>
      </div>

      <Tabs tabs={categoryTabs} activeTab={activeCategory} onTabChange={setActiveCategory} />

      <div className="learn-grid">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
