import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseAnalytics from './components/ExpenseAnalytics';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-800">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 max-w-lg w-full mx-4">
            <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-red-200 mb-4">{this.state.error?.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { currentUser, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (currentUser) {
      const savedExpenses = localStorage.getItem(`expenses_${currentUser.uid}`);
      const savedCategories = localStorage.getItem(`categories_${currentUser.uid}`);
      
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
        setFilteredExpenses(JSON.parse(savedExpenses));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    }
  }, [currentUser]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`expenses_${currentUser.uid}`, JSON.stringify(expenses));
      localStorage.setItem(`categories_${currentUser.uid}`, JSON.stringify(categories));
    }
  }, [expenses, categories, currentUser]);

  const handleAddExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setExpenses(prev => [...prev, newExpense]);
    setFilteredExpenses(prev => [...prev, newExpense]);
  };

  const handleRemoveExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    setFilteredExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
    ));
    setFilteredExpenses(prev => prev.map(expense => 
      expense.id === updatedExpense.id ? { ...expense, ...updatedExpense } : expense
    ));
  };

  const handleAddCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleRemoveCategory = (id) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const handleFilterExpenses = (filters) => {
    let filtered = [...expenses];

    if (filters.category) {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }

    if (filters.startDate) {
      filtered = filtered.filter(expense => new Date(expense.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter(expense => new Date(expense.date) <= new Date(filters.endDate));
    }

    setFilteredExpenses(filtered);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-800 py-10 px-2 sm:px-6 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-[36rem] h-[36rem] rounded-full bg-blue-500 opacity-20 blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-[36rem] h-[36rem] rounded-full bg-purple-500 opacity-20 blur-3xl -bottom-32 -right-32 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-indigo-500 opacity-10 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <header className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">Expense Tracker</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
            <div className="text-lg font-semibold text-indigo-100 bg-black/30 px-5 py-2 rounded-2xl shadow-inner">Total Balance: ${expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</div>
            
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg font-medium"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-10">
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
              <ExpenseForm onAddExpense={handleAddExpense} categories={categories} />
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
              <CategoryManager
                categories={categories}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
              <ExpenseFilter onFilter={handleFilterExpenses} categories={categories} />
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
              <ExpenseAnalytics expenses={filteredExpenses} categories={categories} />
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
              <ExpenseList
                expenses={filteredExpenses}
                onRemoveExpense={handleRemoveExpense}
                onUpdateExpense={handleUpdateExpense}
              />
            </div>
          </div>
        </main>
        <footer className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 px-8 py-4 mt-12">
          <p className="text-center text-indigo-200">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/PiyushY111"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:underline"
            >
              Piyush
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
