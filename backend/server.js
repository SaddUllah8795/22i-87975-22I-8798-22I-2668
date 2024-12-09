
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//const connectDB = require('./config/db');

const voterRoutes = require('./routes/voterRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const electionProgressRoutes = require('./routes/electionProgressRoutes'); // Election Monitoring
const electionResultsRoutes = require('./routes/electionResultsRoutes');   // Results Publishing
const pollingStationRoutes = require('./routes/pollingStationRoutes');         // Polling Station Management
const feedbackRoutes = require('./routes/feedbackRoutes');                 // User Feedback Collection
const fraudDetectionRoutes = require('./routes/fraudDetectionRoutes'); // Fraud Detection and Security Monitoring
const constituencyRoutes = require('./routes/constituencyRoutes'); // Import the route
const userRoutes = require('./routes/userRoutes');


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
app.use('/api/elections', electionProgressRoutes);     // Election Monitoring routes
app.use('/api/results', electionResultsRoutes);        // Results Publishing routes
app.use('/api/polling-stations', pollingStationRoutes);  // Polling Station Management routes
app.use('/api/feedback', feedbackRoutes);                // User Feedback Collection routes
app.use('/api/fraud-detection', fraudDetectionRoutes); // fraud detection routes
app.use('/api/constituencies', constituencyRoutes); // Add route to the server
app.use('/api/users', userRoutes); // Add user-related routes


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
