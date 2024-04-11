import express from 'express';
import { createAllergen } from '../controllers/allergenController.js';

const router = express.Router();

router.post('/', createAllergen);

export default router;