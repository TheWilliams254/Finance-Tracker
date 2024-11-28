import React, { useState } from 'react';
import axios from '../services/api';

const ExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/expenses',
                { amount, category, description, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Expense added!');
        } catch (err) {
            alert('Failed to add expense');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
