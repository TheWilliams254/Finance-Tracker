import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from '../services/api';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const expenseResponse = await axios.get('/api/expenses', { headers: { Authorization: `Bearer ${token}` } });
            const incomeResponse = await axios.get('/api/income', { headers: { Authorization: `Bearer ${token}` } });
            setExpenses(expenseResponse.data);
            setIncome(incomeResponse.data);
        };
        fetchData();
    }, []);

    // Example rendering logic for charts and summaries
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Total Expenses: ${expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
            <p>Total Income: ${income.reduce((sum, i) => sum + i.amount, 0)}</p>
        </div>
    );
};

export default Dashboard;
