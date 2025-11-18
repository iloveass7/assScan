const express = require('express');
const router = express.Router();
const { processImage } = require('../controllers/imageController');

// Process image route
router.post('/process-image', processImage);

module.exports = router;