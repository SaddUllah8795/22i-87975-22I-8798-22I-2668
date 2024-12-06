
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//const connectDB = require('./config/db');
const voterRoutes = require('./routes/voterRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

dotenv.config();
//connectDB();
const app = express();

app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// API Routes
app.use('/api/voters', voterRoutes); // Voter management routes
app.use('/api/candidates', candidateRoutes); // Candidate management routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
