import verifyToken from '../middleware/authMiddleware.js';
import express from 'express';
import { listAllRecipes, getRecipeById, createRecipe, updateRecipe, partiallyUpdateRecipe, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', listAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', verifyToken, createRecipe);
router.put('/:id', verifyToken, updateRecipe);
router.patch('/:id', verifyToken, partiallyUpdateRecipe);
router.delete('/:id', verifyToken, deleteRecipe);

export default router;
