const express = require('express');
const router = express.Router();
const Beat = require('../modules/Beat');

// Initialize beats collection
const beat1 = new Beat(1, 'JeruSwag', 'Trap', 140, 'beats/JeruSwag.mp3');
const beat2 = new Beat(2, 'sci fi2', 'Jazz', 120, 'beats/sci fi2.mp3');
const beats = [beat1, beat2];

// GET /beats - return all beats
router.get('/', (req, res) => {
    try {
        const allDetails = beats.map(b => b.getDetails());
        res.json(allDetails);
        console.log(allDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /beats/:id - return a specific beat
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const beat = beats.find(b => b.id === id);
        if (!beat) return res.status(404).json({ message: 'Beat not found' });
        res.json(beat.getDetails());
        console.log(beat.getDetails());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
