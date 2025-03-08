import React, { useState, useCallback, useMemo, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css"; // Import the stylesheet

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }, []);

  // Add expense
  const addExpense = useCallback(
    (expense) => setExpenses((prevExpenses) => [...prevExpenses, expense]),
    []
  );

  // Remove expense
  const removeExpense = useCallback(
    (id) =>
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      ),
    []
  );

  // Update expense
  const updateExpense = useCallback(
    (updatedExpense) =>
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      ),
    []
  );

  // Memoize theme button text
  const themeButtonText = useMemo(
    () => (theme === "light" ? "Dark" : "Light"),
    [theme]
  );

  // Apply theme class to the body tag
  useEffect(() => {
    document.body.className = theme; // Set the class on the body element
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Expense Tracker</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          Toggle {themeButtonText} Mode
        </button>
      </header>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        onRemoveExpense={removeExpense}
        onUpdateExpense={updateExpense}
      />
      <footer>
        <a className="github-link" href="https://github.com/PiyushY111">
          Coded with love by Piyush
        </a>
      </footer>
    </div>
  );
};

export default App;
