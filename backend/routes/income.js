const express = require('express');
const db = require('../db'); // Database connection
const authenticateToken = require('../middleware/authenticateToken'); // Middleware for authentication

const router = express.Router();

// Add new income
router.post('/income', authenticateToken, async (req, res) => {
    const { amount, source, date } = req.body;
    const userId = req.user.id; // Extracted from the JWT token in the middleware

    try {
        await db.query(
            'INSERT INTO income (user_id, amount, source, date) VALUES (?, ?, ?, ?)',
            [userId, amount, source, date]
        );
        res.status(201).send('Income added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding income');
    }
});

// Get all income for the logged-in user
router.get('/income', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const [income] = await db.query('SELECT * FROM income WHERE user_id = ?', [userId]);
        res.json(income);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching income');
    }
});

module.exports = router;
