import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;