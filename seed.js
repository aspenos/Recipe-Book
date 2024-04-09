import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Allergen from './models/allergen.js';
import Ingredient from './models/ingredient.js';
import IngredientCategory from './models/ingredientCategory.js';
import Recipe from './models/recipe.js';
import RecipeCategory from './models/recipeCategory.js';
import User from './models/user.js';

import allergens from './data/allergens.json' assert {type: 'json'};
import ingredients from './data/ingredients.json' assert {type: 'json'};
import ingredientCategories from './data/ingredientCategories.json' assert {type: 'json'};
import recipes from './data/recipes.json' assert {type: 'json'};
import recipeCategories from './data/recipeCategories.json' assert {type: 'json'};
import users from './data/users.json' assert {type: 'json'};

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');

        await Allergen.deleteMany({});
        await Ingredient.deleteMany({});
        await IngredientCategory.deleteMany({});
        await Recipe.deleteMany({});
        await RecipeCategory.deleteMany({});
        await User.deleteMany({});

        await Allergen.insertMany(allergens);
        await Ingredient.insertMany(ingredients);
        await IngredientCategory.insertMany(ingredientCategories);
        await Recipe.insertMany(recipes);
        await RecipeCategory.insertMany(recipeCategories);
        await User.insertMany(users);

        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();