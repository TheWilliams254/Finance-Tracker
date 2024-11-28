import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/expenses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(response.data);
            } catch (err) {
                alert('Failed to fetch expenses');
            }
        };
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.date}: {expense.category} - ${expense.amount} ({expense.description})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
