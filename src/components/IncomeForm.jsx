import React, { useState } from 'react';
import axios from '../services/api';

const IncomeForm = () => {
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/income',
                { amount, source, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Income added!');
        } catch (err) {
            alert('Failed to add income');
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
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Add Income</button>
        </form>
    );
};

export default IncomeForm;
