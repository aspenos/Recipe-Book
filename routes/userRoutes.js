import express from 'express';
import { getUserProfile, getUserRecipes, addRecipeToFavorites, removeRecipeFromFavorites, getAllUsers, getUserFavorites } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Get a single user profile
router.get('/:userId', getUserProfile);

router.get('/:userId/recipes', getUserRecipes);

router.get('/:userId/favorites', getUserFavorites);

// Add a recipe to favorites
router.post('/:userId/favorites/:recipeId', addRecipeToFavorites);

// Remove a recipe from favorites
router.delete('/:userId/favorites/:recipeId', removeRecipeFromFavorites);

router.post('/login', loginUser);

router.post('/signup', registerUser);

export default router;