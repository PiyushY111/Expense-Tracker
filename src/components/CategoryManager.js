import React, { useState } from 'react';

const CategoryManager = ({ categories, onAddCategory, onUpdateBudget }) => {
  const [newCategory, setNewCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory({
        id: Date.now(),
        name: newCategory.trim(),
        budget: parseFloat(budgetAmount) || 0
      });
      setNewCategory('');
      setBudgetAmount('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Category Management</h2>
      <form onSubmit={handleAddCategory} className="flex flex-col gap-3 mb-6">
        <div>
          <label className="block text-indigo-100 font-medium mb-1" htmlFor="newCategory">New Category Name</label>
          <input
            id="newCategory"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            required
            className="w-full h-10 px-4 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-base"
          />
        </div>
        <div>
          <label className="block text-indigo-100 font-medium mb-1" htmlFor="budgetAmount">Monthly Budget</label>
          <input
            id="budgetAmount"
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            placeholder="Monthly Budget"
            min="0"
            step="0.01"
            className="w-full h-10 px-4 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition text-base mt-2"
        >
          Add Category
        </button>
      </form>
      <div>
        <h3 className="text-lg font-semibold text-indigo-100 mb-3">Current Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 border border-white/10">
              <span className="text-white font-medium w-32 truncate">{category.name}</span>
              <input
                type="number"
                value={category.budget}
                onChange={(e) => onUpdateBudget(category.id, parseFloat(e.target.value))}
                min="0"
                step="0.01"
                className="w-24 h-10 px-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-base"
              />
              <span className="text-indigo-200 text-sm ml-1 whitespace-nowrap">Monthly Budget</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager; 