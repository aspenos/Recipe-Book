import express from 'express';
import { createAllergen, listAllergens } from '../controllers/allergenController.js';

const router = express.Router();

router.get('/', listAllergens);

router.post('/', createAllergen);

export default router;