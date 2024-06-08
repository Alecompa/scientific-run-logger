const express = require('express');
const { Run } = require('../models');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const run = await Run.create(req.body);
    res.json(run);
});

router.get('/', authenticate, async (req, res) => {
    const runs = await Run.findAll({
        order: [['createdAt', 'DESC']],
        limit: 50
    });
    res.json(runs);
});

router.get('/next-run-number', authenticate, async (req, res) => {
    try {
        const lastRun = await Run.findOne({ order: [['run_number', 'DESC']] });
        const nextRunNumber = lastRun ? lastRun.run_number + 1 : 1;
        res.json({ nextRunNumber });
    } catch (error) {
        console.error('Error fetching next run number:', error);
        res.status(500).json({ error: 'Error fetching next run number' });
    }
});

module.exports = router;