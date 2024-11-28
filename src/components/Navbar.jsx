import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-expense">Add Expense</Link>
        <Link to="/add-income">Add Income</Link>
        <Link to="/login">Login</Link>
    </nav>
);

export default Navbar;
