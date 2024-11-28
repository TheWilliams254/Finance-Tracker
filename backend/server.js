const express = require('express');
const cors = require('cors');
const db = require('./db');

const authRoutes = require('./routes/auth'); // Authentication routes
const incomeRoutes = require('./routes/income'); // Income routes
const expenseRoutes = require('./routes/expenses'); // Expense routes

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', incomeRoutes);
app.use('/api', expenseRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
