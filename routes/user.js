const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        const result = await user.save();
        res.status(201).json({
            message: "User created",
            result: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign(
            { username: user.username, userId: user._id },
            'secret_this_should_be_longer_than_it_is',
            { expiresIn: '24h' }
        );

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
