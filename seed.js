import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Allergen from './models/allergen.js';
import Ingredient from './models/ingredient.js';
import IngredientCategory from './models/ingredientCategory.js';


import allergens from './data/allergens.json' assert {type: 'json'};
import ingredientCategories from './data/ingredientCategories.json' assert {type: 'json'};
import ingredients from './data/ingredients.json' assert {type: 'json'};

dotenv.config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
        await Allergen.deleteMany({});
        await IngredientCategory.deleteMany({});
        await Ingredient.deleteMany({});
        await Allergen.insertMany(allergens);
        await IngredientCategory.insertMany(ingredientCategories);

        const dbIngredientCategories = await IngredientCategory.find();
        
        const dbAllergens = await Allergen.find();

        let categoryMap = {};
        dbIngredientCategories.forEach(cat => categoryMap[cat.name] = cat._id);

        let allergenMap = {};
        dbAllergens.forEach(all => allergenMap[all.name] = all._id);

        console.log('Ingredient categories and allergens seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
