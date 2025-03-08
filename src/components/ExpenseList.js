import React, { useState } from "react";

const ExpenseList = ({ expenses, onRemoveExpense, onUpdateExpense }) => {
  const [editableExpense, setEditableExpense] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  const handleDelete = (id) => {
    onRemoveExpense(id);
  };

  const handleEdit = (expense) => {
    setEditableExpense(expense.id); // Set the expense as editable
    setUpdatedDescription(expense.description);
    setUpdatedAmount(expense.amount);
    setUpdatedCategory(expense.category);
  };

  const handleSave = (id) => {
    const updatedExpense = {
      id,
      description: updatedDescription,
      amount: parseFloat(updatedAmount),
      category: updatedCategory,
    };
    onUpdateExpense(updatedExpense);
    setEditableExpense(null); // Exit edit mode
  };

  const handleCancel = () => {
    setEditableExpense(null); // Exit edit mode without saving
  };

  return (
    <div className="expense-container">
      <h2>Expense List</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            {editableExpense === expense.id ? (
              // Editable fields
              <>
                <input
                  type="text"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  required
                />
                <input
                  type="number"
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  required
                />
                <button
                  onClick={() => handleSave(expense.id)}
                  className="submit-button"
                >
                  Save
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
              </>
            ) : (
              // Non-editable view
              <>
                <span>
                  {expense.description} - ${expense.amount} - {expense.category}
                </span>
                <div>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
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
    </div>
  );
};

export default ExpenseList;
