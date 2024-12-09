require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');
const Constituency = require('../models/Constituency'); // Adjust path if needed

const constituencies = [
  { name: 'NA-120', code: 'NA120' },
  { name: 'NA-121', code: 'NA121' },
  { name: 'NA-122', code: 'NA122' },
  { name: 'NA-123', code: 'NA123' },
  { name: 'NA-124', code: 'NA124' },
];

const addConstituencies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Insert constituencies
    await Constituency.insertMany(constituencies);
    console.log('Constituencies added successfully');

    mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error adding constituencies:', error);
    mongoose.disconnect();
  }
};

addConstituencies();
