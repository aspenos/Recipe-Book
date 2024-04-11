import User from '../models/user.js';

export const addRecipeToFavorites = async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the recipe to the user's favorites if it's not already there
        if (!user.favorites.includes(recipeId)) {
            user.favorites.push(recipeId);
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeRecipeFromFavorites = async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the recipe from the user's favorites
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== recipeId);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
