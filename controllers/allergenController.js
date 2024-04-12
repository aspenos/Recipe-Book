import Allergen from '../models/allergen.js';


export const listAllergens = async (req, res) => {
    try {
        const allergens = await Allergen.find();
        res.json(allergens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAllergen = async (req, res) => {
    try {
        const newAllergen = new Allergen({
            name: req.body.name
        });
        const savedAllergen = await newAllergen.save();
        res.status(201).json(savedAllergen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


