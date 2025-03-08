import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      category,
    };

    onAddExpense(newExpense);
    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
