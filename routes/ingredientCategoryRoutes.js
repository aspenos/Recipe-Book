import express from 'express';
import { listIngredientCategories, createIngredientCategory } from '../controllers/ingredientCategoryController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listIngredientCategories);
router.post('/', verifyToken, createIngredientCategory);

export default router;
