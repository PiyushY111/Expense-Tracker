import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ExpenseAnalytics = ({ expenses = [], categories = [] }) => {
  // Calculate category-wise spending
  const categorySpending = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      name: category.name,
      value: total,
      budget: category.budget
    };
  });

  // Calculate monthly spending
  const monthlySpending = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlySpending).map(([month, amount]) => ({
    month,
    amount
  }));

  return (
    <div className="expense-analytics text-white">
      <h2 className="text-2xl font-bold mb-4 text-white">Expense Analytics</h2>
      <div className="charts-container">
        <div className="chart-wrapper mb-8">
          <h3 className="text-lg font-semibold text-indigo-100 mb-2">Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySpending}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip wrapperStyle={{ color: '#222', background: '#fff' }} contentStyle={{ background: '#fff', color: '#222', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper mb-8">
          <h3 className="text-lg font-semibold text-indigo-100 mb-2">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
              <XAxis dataKey="month" stroke="#c7d2fe" />
              <YAxis stroke="#c7d2fe" />
              <Tooltip wrapperStyle={{ color: '#222', background: '#fff' }} contentStyle={{ background: '#fff', color: '#222', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Bar dataKey="amount" fill="#82ca9d" name="Spending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="summary-cards flex flex-col sm:flex-row gap-4 mt-6">
        <div className="summary-card bg-white/10 rounded-lg p-4 flex-1">
          <h3 className="text-indigo-100 text-lg font-semibold mb-1">Total Spending</h3>
          <p className="text-2xl font-bold text-white">${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</p>
        </div>
        <div className="summary-card bg-white/10 rounded-lg p-4 flex-1">
          <h3 className="text-indigo-100 text-lg font-semibold mb-1">Average Monthly Spending</h3>
          <p className="text-2xl font-bold text-white">${(expenses.reduce((sum, expense) => sum + expense.amount, 0) / (Object.keys(monthlySpending).length || 1)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics; 