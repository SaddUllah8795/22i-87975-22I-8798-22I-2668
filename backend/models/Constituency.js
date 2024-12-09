const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const Constituency = mongoose.model('Constituency', constituencySchema);

module.exports = Constituency;
