import express from 'express';
import { listAllIngredients, getIngredientById, createIngredient, updateIngredient, partiallyUpdateIngredient, deleteIngredient } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', listAllIngredients);
router.get('/:id', getIngredientById);
router.post('/', createIngredient);
router.put('/:id', updateIngredient);
router.patch('/:id', partiallyUpdateIngredient);
router.delete('/:id', deleteIngredient);

export default router;

