const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Ensure this path is correct
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login a user
router.post('/login', async (req, res) => {
    console.log('Login endpoint hit');
    console.log('Request body:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
        console.log('Missing username or password');
        return res.status(400).send('Username and password are required');
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(400).send('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).send('Invalid credentials');
        }
        console.log('Login successful');
        res.send({ role: user.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
