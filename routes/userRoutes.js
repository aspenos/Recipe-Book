import express from 'express';
import { getUserProfile, getUserRecipes, addRecipeToFavorites, removeRecipeFromFavorites, getAllUsers, getUserFavorites, registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();


router.get('/', getAllUsers);


router.get('/:userId', getUserProfile);

router.get('/:userId/recipes', getUserRecipes);

router.get('/:userId/favorites', getUserFavorites);

router.post('/signup', registerUser);

router.post('/login', loginUser);


router.post('/:userId/favorites/:recipeId', addRecipeToFavorites);


router.delete('/:userId/favorites/:recipeId', removeRecipeFromFavorites);

export default router;