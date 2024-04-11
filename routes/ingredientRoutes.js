const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// Route to get a list of all ingredients
router.get('/', ingredientController.listAllIngredients);

// Route to get a single ingredient by its ID
router.get('/:id', ingredientController.getIngredientById);

// Route to create a new ingredient
router.post('/', ingredientController.createIngredient);

// Route to update an existing ingredient by its ID
router.put('/:id', ingredientController.updateIngredient);

// Route to partially update an existing ingredient by its ID
router.patch('/:id', ingredientController.partiallyUpdateIngredient);

// Route to delete an ingredient by its ID
router.delete('/:id', ingredientController.deleteIngredient);

module.exports = router;
