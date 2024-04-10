import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const recipeSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: [String],
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'RecipeCategory'
    }],
    allergens: [{
        type: Schema.Types.ObjectId,
        ref: 'Allergen'
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;