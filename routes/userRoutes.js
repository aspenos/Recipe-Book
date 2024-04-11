import express from 'express';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../controllers/userController.js';

const router = express.Router();

router.post('/users/:userId/favorites/:recipeId', addRecipeToFavorites);
router.delete('/users/:userId/favorites/:recipeId', removeRecipeFromFavorites);

export default router;