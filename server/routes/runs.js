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

router.post('/add-note', authenticate, async (req, res) => {
    const runNumber = req.body.runNumber;
    const note = req.body.note;
    console.log(runNumber, note);
    const run = await Run.findOne({ where: { run_number: runNumber } });
    if (!run) {
        return res.status(404).json({ error: 'Run not found' });
    }
    run.notes = note;
    await run.save();
    res.json(run);
});

router.get('/get-note/:runsNumber', authenticate, async (req, res) => {
    const runNumber = req.params.runsNumber;
    const run = await Run.findOne({ where: { run_number: runNumber } });
    if (!run) {
        return res.status(404).json({ error: 'Run not found' });
    }
    res.json({ note: run.notes });
});

module.exports = router;