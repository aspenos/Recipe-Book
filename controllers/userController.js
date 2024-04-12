import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to validate password strength
const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasNumbers = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#\$%\^&\*]/.test(password);
    return password.length >= minLength && hasNumbers && hasUpper && hasLower && hasSpecial;
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserRecipes = async (req, res) => {
    try {
        const { userId } = req.params;
        const recipes = await Recipe.find({ creator: userId });
        if (!recipes) {
            return res.status(404).json({ message: 'No recipes found' });
        }
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!isPasswordStrong(password)) {
            return res.status(400).json({ message: 'Password does not meet the strength requirements.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addRecipeToFavorites = async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
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
        user.favorites = user.favorites.filter(favorite => favorite.toString() !== recipeId);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
