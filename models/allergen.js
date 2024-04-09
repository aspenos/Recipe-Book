import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const allergenSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Allergen = mongoose.model('Allergen', allergenSchema);

export default Allergen;