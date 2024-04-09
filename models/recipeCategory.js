import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recipeCategorySchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    }
});

const RecipeCategory = mongoose.model('RecipeCategory', recipeCategorySchema);

export default RecipeCategory;