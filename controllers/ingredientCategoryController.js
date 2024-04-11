import IngredientCategory from '../models/ingredientCategory.js';

export const listIngredientCategories = async (req, res) => {
    try {
        const categories = await IngredientCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createIngredientCategory = async (req, res) => {
    try {
        const newCategory = new IngredientCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
