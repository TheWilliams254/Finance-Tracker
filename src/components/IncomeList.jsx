import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const IncomeList = () => {
    const [income, setIncome] = useState([]);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/income', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIncome(response.data);
            } catch (err) {
                alert('Failed to fetch income');
            }
        };
        fetchIncome();
    }, []);

    return (
        <div>
            <h2>Income List</h2>
            <ul>
                {income.map((entry) => (
                    <li key={entry.id}>
                        {entry.date}: {entry.source} - ${entry.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IncomeList;
