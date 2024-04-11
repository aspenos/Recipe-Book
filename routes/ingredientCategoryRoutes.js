import express from 'express';
import { listIngredientCategories, createIngredientCategory } from '../controllers/ingredientCategoryController.js';

const router = express.Router();

router.get('/', listIngredientCategories);
router.post('/', createIngredientCategory);

export default router;
