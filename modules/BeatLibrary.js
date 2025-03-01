// modules/BeatLibrary.js

const Beat = require('./Beat');

class BeatLibrary {
  constructor() {
    this.beats = [];
  }

  addBeat(beat) {
    this.beats.push(beat);
  }

  getBeats() {
    return this.beats.map(beat => beat.getDetails());
  }

  getBeatById(id) {
    return this.beats.find(beat => beat.id === id);
  }
}

module.exports = BeatLibrary;