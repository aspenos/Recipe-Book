import express from 'express';
import { listRecipeCategories, createRecipeCategory } from '../controllers/recipeCategoryController.js';

const router = express.Router();

router.get('/', listRecipeCategories);
router.post('/', createRecipeCategory);

export default router;
