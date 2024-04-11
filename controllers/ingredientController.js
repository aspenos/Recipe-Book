import Ingredient from '../models/ingredient.js';

export const listAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find().populate('category allergens');
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id).populate('category allergens');
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createIngredient = async (req, res) => {
    try {
        const newIngredient = new Ingredient(req.body);
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const partiallyUpdateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteIngredient = async (req, res) => {
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(204).json({ message: 'Ingredient deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
