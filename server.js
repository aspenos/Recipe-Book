import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import ingredientCategoryRoutes from './routes/ingredientCategoryRoutes.js';
import recipeCategoryRoutes from './routes/recipeCategoryRoutes.js';
import allergenRoutes from './routes/allergenRoutes.js';
import userRoutes from './routes/userRoutes.js';
import verifyToken from './middleware/authMiddleware.js';

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());

server.use('/recipes', recipeRoutes);
server.use('/ingredients', ingredientRoutes);
server.use('/ingredient-categories', verifyToken, ingredientCategoryRoutes);
server.use('/recipe-categories', verifyToken, recipeCategoryRoutes);
server.use('/allergens', verifyToken, allergenRoutes);
server.use('/users', userRoutes);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
