const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
});

// Use `mongoose.models` to check if the model already exists
const Constituency = mongoose.models.Constituency || mongoose.model('Constituency', constituencySchema);

module.exports = Constituency;
