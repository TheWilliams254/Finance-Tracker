import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddExpensePage from './pages/AddExpensePage';
import AddIncomePage from './pages/AddIncomePage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/add-expense" element={<AddExpensePage />} />
                <Route path="/add-income" element={<AddIncomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
