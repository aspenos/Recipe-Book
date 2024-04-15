import Recipe from '../models/recipe.js';

export const listAllRecipes = async (req, res) => {
    try {
        const { recipeCategory } = req.query;
        let query = {};
        if (recipeCategory) {
            query.categories = recipeCategory;
        }
        const recipes = await Recipe.find(query).populate('ingredients categories allergens creator');
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate('categories allergens creator')
            .populate({ path: 'ingredients', model: 'Ingredient' });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        console.log(recipe); 
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRecipe = async (req, res) => {
    const { name, description, ingredients, categories, image } = req.body;

    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const newRecipe = new Recipe({
            name,
            description,
            ingredients, 
            categories,
            creator: req.userId,
            image
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('ingredients categories allergens creator');
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const partiallyUpdateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate('ingredients categories allergens creator');
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(204).json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

