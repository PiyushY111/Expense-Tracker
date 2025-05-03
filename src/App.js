import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import Login from './components/Login';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import CategoryManager from './components/CategoryManager';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseAnalytics from './components/ExpenseAnalytics';

function AppContent() {
  const { currentUser, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // Subscribe to expenses
    const expensesQuery = query(
      collection(db, 'expenses'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      const expensesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(expensesData);
      setFilteredExpenses(expensesData);
    });

    // Subscribe to categories
    const categoriesQuery = query(
      collection(db, 'categories'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
      const categoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesData);
    });

    return () => {
      unsubscribeExpenses();
      unsubscribeCategories();
    };
  }, [currentUser]);

  const handleAddExpense = async (expense) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleRemoveExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error('Error removing expense:', error);
    }
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      await updateDoc(doc(db, 'expenses', updatedExpense.id), {
        ...updatedExpense,
        userId: currentUser.uid
      });
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleAddCategory = async (category) => {
    try {
      await addDoc(collection(db, 'categories'), {
        ...category,
        userId: currentUser.uid
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      console.error('Error removing category:', error);
    }
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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
