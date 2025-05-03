import React, { useState } from "react";

const ExpenseList = ({ expenses, onRemoveExpense, onUpdateExpense }) => {
  const [editableExpense, setEditableExpense] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  const handleDelete = (id) => {
    onRemoveExpense(id);
  };
  

  const handleEdit = (expense) => {
    setEditableExpense(expense.id);
    setUpdatedDescription(expense.description);
    setUpdatedAmount(expense.amount);
    setUpdatedCategory(expense.category);
    setUpdatedDate(expense.date.split('T')[0]);
  };

  const handleSave = (id) => {
    const updatedExpense = {
      id,
      description: updatedDescription,
      amount: parseFloat(updatedAmount),
      category: updatedCategory,
      date: updatedDate
    };
    onUpdateExpense(updatedExpense);
    setEditableExpense(null);
  };

  const handleCancel = () => {
    setEditableExpense(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Expense List</h2>
      {expenses.length === 0 ? (
        <div className="bg-white/10 rounded-xl p-6 text-center text-indigo-100 border border-white/10">
          <p>No expenses found. Add your first expense above!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.id} className="bg-white/10 rounded-xl p-4 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {editableExpense === expense.id ? (
                <div className="w-full flex flex-col md:flex-row md:items-end gap-4">
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <input
                    type="number"
                    value={updatedAmount}
                    onChange={(e) => setUpdatedAmount(e.target.value)}
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    required
                    className="w-32 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <input
                    type="text"
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    placeholder="Category"
                    required
                    className="w-40 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-indigo-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <input
                    type="date"
                    value={updatedDate}
                    onChange={(e) => setUpdatedDate(e.target.value)}
                    required
                    className="w-44 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleSave(expense.id)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow hover:from-green-600 hover:to-emerald-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold shadow hover:from-gray-500 hover:to-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 flex flex-col md:flex-row md:items-center md:gap-8">
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-lg font-semibold text-white">{expense.description}</span>
                      <span className="text-indigo-200 text-sm">{expense.category}</span>
                    </div>
                    <div className="flex flex-col gap-1 md:items-end">
                      <span className="text-lg font-bold text-indigo-100">{formatAmount(expense.amount)}</span>
                      <span className="text-indigo-300 text-xs">{formatDate(expense.date)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                    <button
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
