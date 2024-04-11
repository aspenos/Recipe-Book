import express from 'express';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import allergenRoutes from './routes/allergenRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/categories', categoryRoutes);
app.use('/allergens', allergenRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
