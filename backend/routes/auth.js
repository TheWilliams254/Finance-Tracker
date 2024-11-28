const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).send('User registered!');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (!users.length || !(await bcrypt.compare(password, users[0].password))) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: users[0].id }, 'secret_key');
    res.json({ token });
});

module.exports = router;
