import express from 'express';
import { listAllRecipes, getRecipeById, createRecipe, updateRecipe, partiallyUpdateRecipe, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', listAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.patch('/:id', partiallyUpdateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
