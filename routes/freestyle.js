var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Beat = require('../modules/Beat');
const BeatLibrary = require('../modules/BeatLibrary');
const RecordingManager = require('../modules/RecordingManager');

// Initialize BeatLibrary and RecordingManager
const beatLibrary = new BeatLibrary();
beatLibrary.addBeat(new Beat(1, 'JeruSwag', 'Hip Hop', 90, '/beats/JeruSwag.mp3'));
beatLibrary.addBeat(new Beat(2, 'sci fi2', 'Lo-Fi', 75, '/beats/sci fi2.mp3'));

const recordingManager = new RecordingManager();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const recordingsDir = path.join(__dirname, '../public/recordings');
    if (!fs.existsSync(recordingsDir)) {
      fs.mkdirSync(recordingsDir);
    }
    cb(null, recordingsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `recording-${uniqueSuffix}.mp3`);
  }
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/beats', function(req, res, next) {
const beats = beatLibrary.getBeats();
res.render('beats', { title: 'Freestyle', authenticated: false, beats: beats });
});

// Route to save the recording
router.post('/record/save', upload.single('audio'), function(req, res, next) {
  const file = req.file;
  if (file) {
    const recording = recordingManager.stopRecording();
    recording.filePath = `/recordings/${file.filename}`;
    res.json({ status: 'Recording saved', filePath: recording.filePath });
  } else {
    res.status(400).json({ status: 'No file uploaded' });
  }
});
router.get('/', function(req, res, next) {
  res.render('freestyle', { title: 'Freestyle', authenticated: false });
}
);
module.exports = router;
