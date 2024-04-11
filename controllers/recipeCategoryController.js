import RecipeCategory from '../models/recipeCategory.js';

export const listRecipeCategories = async (req, res) => {
    try {
        const categories = await RecipeCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRecipeCategory = async (req, res) => {
    try {
        const newCategory = new RecipeCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
