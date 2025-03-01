// modules/Beat.js


class Beat {
  constructor(id, title, genre, tempo, filePath) {
    if (!id || !title || !genre || !tempo || !filePath) {
      throw new Error("All fields must be provided");
    }
    if (typeof id !== 'number' || typeof tempo !== 'number') {
      throw new Error("ID and tempo must be numbers");
    }
    if (typeof title !== 'string' || typeof genre !== 'string' || typeof filePath !== 'string') {
      throw new Error("Title, genre, and filePath must be strings");
    }

    this.id = id;
    this.title = title;
    this.genre = genre;
    this.tempo = tempo;
    this.filePath = filePath;
  }

  getDetails() {
    return {
      id: this.id,
      title: this.title,
      genre: this.genre,
      tempo: this.tempo,
      filePath: this.filePath,
    };
  }


}

module.exports = Beat;
