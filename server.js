import express from 'express';

const server = express();

//route stuff

const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const allergenRoutes = require('./routes/allergenRoutes');

server.use('/recipes', recipeRoutes);
server.use('/ingredients', ingredientRoutes);
server.use('/categories', categoryRoutes);
server.use('/allergens', allergenRoutes);


server.listen(PORT, function() {
    console.log(`Server running at PORT ${PORT}`);
});

