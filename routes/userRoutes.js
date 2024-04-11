const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to add a recipe to a user's favorites
router.post('/users/:userId/favorites/:recipeId', userController.addFavorite);

// Route to delete a recipe from a user's favorites
router.delete('/users/:userId/favorites/:recipeId', userController.removeFavorite);

module.exports = router;