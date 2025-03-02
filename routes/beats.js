const express = require('express');
const router = express.Router();
const Beat = require('../modules/Beat');
const BeatLibrary = require('../modules/BeatLibrary');

// Initialize BeatLibrary with default beats
const beatLibrary = new BeatLibrary();
const beat1 = new Beat(1, 'JeruSwag', 'Trap', 140, 'beats/JeruSwag.mp3');
const beat2 = new Beat(2, 'sci fi2', 'Jazz', 120, 'beats/sci fi2.mp3');
beatLibrary.addBeat(beat1);
beatLibrary.addBeat(beat2);

// GET /beats - return all beats (HTML or JSON)
router.get('/', (req, res) => {
    try {
        const allDetails = beatLibrary.getBeats();
        if (req.accepts('html')) {
            res.render('beats', { beats: allDetails });
        } else {
            res.json(allDetails);
            console.log(allDetails);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /beats/add - add a new beat from form data
router.post('/add', (req, res) => {
    try {
        // Compute new id based on current number of beats
        const newId = beatLibrary.getBeats().length + 1;
        const { title, genre, tempo, filePath } = req.body;
        const newBeat = new Beat(newId, title, genre, parseInt(tempo, 10), filePath);
        beatLibrary.addBeat(newBeat);
        res.redirect('/beats');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /beats/:id - return a specific beat
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const beat = beatLibrary.getBeatById(id);
        if (!beat) return res.status(404).json({ message: 'Beat not found' });
        res.json(beat.getDetails());
        console.log(beat.getDetails());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
