const express = require('express');
const router = express.Router();
const allergenController = require('../controllers/allergenController');

// Route to add a new allergen
router.post('/', allergenController.createAllergen);

module.exports = router;
