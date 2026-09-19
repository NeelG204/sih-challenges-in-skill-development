export const user = {
  name: 'Aarav',
  avatar: null,
  level: 4,
  title: 'Python Developer',
  xp: 12450,
  streak: 12,
  rank: 152,
  totalLearners: 1520,
  overallSkill: 68,
  weeklyXp: 560,
  journey: { from: 3, to: 8, skill: 'Python' },
};

export const skills = [
  { name: 'Python', level: 3, target: 8, gap: 5, color: 'var(--accent-yellow)', progress: 37 },
  { name: 'DSA', level: 2, target: 10, gap: 6, color: 'var(--accent-red)', progress: 20 },
  { name: 'SQL', level: 4, target: 7, gap: 3, color: 'var(--accent-green)', progress: 57 },
  { name: 'Git', level: 3, target: 8, gap: 5, color: 'var(--accent-cyan)', progress: 37 },
  { name: 'System Design', level: 1, target: 8, gap: 7, color: 'var(--accent-orange)', progress: 12 },
];

export const achievements = [
  { icon: '🔥', title: '7 Day Streak', description: 'Maintained a 7-day learning streak' },
  { icon: '🏆', title: 'First Project', description: 'Completed your first project' },
  { icon: '⚡', title: 'Challenge Master', description: 'Completed 10 challenges' },
  { icon: '🚀', title: 'Level 4 Complete', description: 'Reached Level 4 in Python' },
  { icon: '💎', title: 'Perfect Score', description: 'Got 100% on an assessment' },
  { icon: '🎯', title: 'Sharpshooter', description: 'Passed all test cases first try' },
];

export const recommendations = [
  { title: 'Python Problem Solver', subtitle: 'Level 4 • 75% complete', type: 'Continue Learning' },
  { title: 'DSA Basics', subtitle: 'Start your DSA journey', type: 'Recommended' },
  { title: 'Git & GitHub', subtitle: 'Essential for collaboration', type: 'Recommended' },
];

export const performanceMetrics = [
  { label: 'Correctness', value: 82, color: 'var(--accent-green)' },
  { label: 'Code Quality', value: 65, color: 'var(--accent-cyan)' },
  { label: 'Efficiency', value: 51, color: 'var(--accent-yellow)' },
  { label: 'Problem Solving', value: 74, color: 'var(--accent-purple)' },
];

export const careerDNA = {
  yourMatch: 48,
  targetMatch: 78,
  targetCompany: 'Google SWE DNA',
  missingGenes: ['Advanced OOP', 'System Design', 'Testing', 'Concurrency', 'Cloud Basics'],
  recommendations: [
    { skill: 'System Design', progress: 40, priority: 'high' },
    { skill: 'Testing', progress: 55, priority: 'medium' },
    { skill: 'Cloud Basics', progress: 60, priority: 'medium' },
    { skill: 'Advanced OOP', progress: 70, priority: 'low' },
  ],
};
