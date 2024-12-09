const express = require('express');
const { getAllCoordinators } = require('../controllers/userController'); // Import the controller function

const router = express.Router();

// Route to get all coordinators
router.get('/coordinators', getAllCoordinators);

module.exports = router;
