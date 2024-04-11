const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to get a list of all recipes
router.get('/', recipeController.listAllRecipes);

// Route to get a single recipe by its ID
router.get('/:id', recipeController.getRecipeById);

// Route to create a new recipe
router.post('/', recipeController.createRecipe);

// Route to update an existing recipe by its ID
router.put('/:id', recipeController.updateRecipe);

// Route to partially update an existing recipe by its ID
router.patch('/:id', recipeController.partiallyUpdateRecipe);

// Route to delete a recipe by its ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;