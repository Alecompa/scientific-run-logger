const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = 'your_jwt_secret';
const router = express.Router();

router.post('/register', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;