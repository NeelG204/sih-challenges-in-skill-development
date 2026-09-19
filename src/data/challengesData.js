export const challenges = [
  {
    id: 1,
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    category: 'Python',
    difficulty: 'Intermediate',
    xp: 500,
    progress: 60,
    estimatedTime: '3 hours',
    description: 'Build a Python program for an expense tracker that allows users to manage their finances.',
    requirements: [
      'Add new expenses',
      'View all expenses',
      'Search expenses by category',
      'Generate total summary',
      'Save and load data from file',
    ],
    testCases: [
      { name: 'Add Expense', passed: true },
      { name: 'View Expenses', passed: true },
      { name: 'Search by Category', passed: true },
      { name: 'Total Summary', passed: true },
      { name: 'Save & Load', passed: true },
    ],
    defaultCode: `import json

def add_expense(expenses, desc, amount, category):
    expense = {
        "description": desc,
        "amount": amount,
        "category": category
    }
    expenses.append(expense)
    return expenses

def view_expenses(expenses):
    for e in expenses:
    print(f"{e['description']}: \${e['amount']} [{e['category']}]")

def search_by_category(expenses, category):
    return [e for e in expenses if e['category'] == category]

def total_summary(expenses):
    return sum(e['amount'] for e in expenses)

def save_data(expenses, filename="expenses.json"):
    with open(filename, 'w') as f:
        json.dump(expenses, f)

def load_data(filename="expenses.json"):
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Test
expenses = []
expenses = add_expense(expenses, "Lunch", 12.50, "Food")
expenses = add_expense(expenses, "Bus", 3.00, "Transport")
view_expenses(expenses)
print(f"Total: \${total_summary(expenses)}")`,
    timer: { days: 2, hours: 14 },
  },
  {
    id: 2,
    slug: 'weather-api',
    title: 'Weather API',
    category: 'Python',
    difficulty: 'Intermediate',
    xp: 400,
    progress: 0,
    estimatedTime: '2.5 hours',
    description: 'Build a weather application that fetches and displays weather data.',
    requirements: ['Fetch weather data', 'Parse JSON response', 'Display formatted output', 'Handle errors gracefully'],
    testCases: [
      { name: 'Fetch Data', passed: false },
      { name: 'Parse JSON', passed: false },
      { name: 'Display Output', passed: false },
      { name: 'Error Handling', passed: false },
    ],
    defaultCode: `import requests

def get_weather(city):
    # Your implementation here
    pass

def display_weather(data):
    # Your implementation here
    pass`,
    timer: { days: 5, hours: 0 },
  },
  {
    id: 3,
    slug: 'array-optimizer',
    title: 'Array Optimizer',
    category: 'DSA',
    difficulty: 'Advanced',
    xp: 700,
    progress: 0,
    estimatedTime: '4 hours',
    description: 'Optimize array operations for maximum performance.',
    requirements: ['Implement efficient sorting', 'Binary search', 'Array rotation', 'Complexity analysis'],
    testCases: [
      { name: 'Sorting', passed: false },
      { name: 'Binary Search', passed: false },
      { name: 'Rotation', passed: false },
      { name: 'Complexity', passed: false },
    ],
    defaultCode: `def optimized_sort(arr):
    # Your implementation here
    pass

def binary_search(arr, target):
    # Your implementation here
    pass`,
    timer: { days: 7, hours: 0 },
  },
  {
    id: 4,
    slug: 'sql-analytics',
    title: 'SQL Analytics',
    category: 'SQL',
    difficulty: 'Intermediate',
    xp: 450,
    progress: 30,
    estimatedTime: '2 hours',
    description: 'Write complex SQL queries for data analytics.',
    requirements: ['JOIN operations', 'Window functions', 'Aggregation', 'Subqueries'],
    testCases: [
      { name: 'JOINs', passed: true },
      { name: 'Window Functions', passed: false },
      { name: 'Aggregation', passed: true },
      { name: 'Subqueries', passed: false },
    ],
    defaultCode: `-- Write your SQL queries here
SELECT * FROM employees;

-- Find average salary by department
-- Your query here`,
    timer: { days: 3, hours: 0 },
  },
];
