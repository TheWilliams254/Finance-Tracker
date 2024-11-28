const express = require('express');
const db = require('../db'); // Database connection
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for authentication

const router = express.Router();

// Add new expense
router.post('/expenses', authenticateToken, async (req, res) => {
    const { amount, category, description, date } = req.body;
    const userId = req.user.id; // Extracted from the JWT token in the middleware

    try {
        await db.query(
            'INSERT INTO expenses (user_id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)',
            [userId, amount, category, description, date]
        );
        res.status(201).send('Expense added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding expense');
    }
});

// Get all expenses for the logged-in user
router.get('/expenses', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const [expenses] = await db.query('SELECT * FROM expenses WHERE user_id = ?', [userId]);
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses');
    }
});

// Optional: Add a route to filter expenses by category or date
router.get('/expenses/filter', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { category, startDate, endDate } = req.query;

    let query = 'SELECT * FROM expenses WHERE user_id = ?';
    const params = [userId];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (startDate && endDate) {
        query += ' AND date BETWEEN ? AND ?';
        params.push(startDate, endDate);
    }

    try {
        const [filteredExpenses] = await db.query(query, params);
        res.json(filteredExpenses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error filtering expenses');
    }
});

module.exports = router;
