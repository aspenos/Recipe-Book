import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Allergen from './models/allergen.js';
import Ingredient from './models/ingredient.js';
import IngredientCategory from './models/ingredientCategory.js';
import RecipeCategory from './models/recipeCategory.js';
import Recipe from './models/recipe.js';
import User from './models/user.js';

import allergens from './data/allergens.json' assert {type: 'json'};
import ingredientCategories from './data/ingredientCategories.json' assert {type: 'json'};
import ingredients from './data/ingredients.json' assert {type: 'json'};
import recipeCategories from './data/recipeCategories.json' assert {type: 'json'};
import recipes from './data/recipes.json' assert {type: 'json'};
import users from './data/users.json' assert {type: 'json'};

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');

       
        await Allergen.deleteMany({});
        await IngredientCategory.deleteMany({});
        await RecipeCategory.deleteMany({});
        await Ingredient.deleteMany({});
        await Recipe.deleteMany({});
        await User.deleteMany({});

       
        await Allergen.insertMany(allergens);
        await IngredientCategory.insertMany(ingredientCategories);
        await RecipeCategory.insertMany(recipeCategories);
        console.log('Allergens, Ingredient Categories, and Recipe Categories seeded successfully');

        
        const dbIngredientCategories = await IngredientCategory.find();
        const dbAllergens = await Allergen.find();

        let categoryMap = {};
        dbIngredientCategories.forEach(cat => categoryMap[cat.name] = cat._id.toString());

        let allergenMap = {};
        dbAllergens.forEach(all => allergenMap[all.name] = all._id.toString());

       
        const updatedIngredients = ingredients.map(ingredient => ({
            ...ingredient,
            category: ingredient.category.map(name => categoryMap[name]), 
            allergens: ingredient.allergens.map(name => allergenMap[name]) 
        }));
        await Ingredient.insertMany(updatedIngredients);
        console.log('Ingredients seeded successfully');

       
        const encryptedUsers = users.map(user => ({
            username: user.username,
            password: bcrypt.hashSync(user.password, 10),
            email: user.email
        }));
        await User.insertMany(encryptedUsers);
        console.log('Users seeded successfully');

        
        const dbUsers = await User.find();
        let userMap = {};
        dbUsers.forEach(user => userMap[user.username] = user._id);

        const dbIngredients = await Ingredient.find();
        const dbRecipeCategories = await RecipeCategory.find();
        let recipeCategoryMap = {};
        dbRecipeCategories.forEach(cat => recipeCategoryMap[cat.name] = cat._id.toString());

        
        const updatedRecipes = recipes.map(recipe => ({
            ...recipe,
            ingredients: recipe.ingredients.map(ingName => {
                const ingredient = dbIngredients.find(ing => ing.name === ingName);
                return ingredient ? ingredient._id : null;
            }),
            categories: recipe.categories.map(catName => recipeCategoryMap[catName] || null), 
            allergens: recipe.allergens.map(allName => allergenMap[allName] || null),
            creator: userMap[recipe.creator]
        }));
        await Recipe.insertMany(updatedRecipes);
        console.log('Recipes seeded successfully');

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
