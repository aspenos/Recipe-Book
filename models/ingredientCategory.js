import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ingredientCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const IngredientCategory = mongoose.model('IngredientCategory', ingredientCategorySchema);

export default IngredientCategory;