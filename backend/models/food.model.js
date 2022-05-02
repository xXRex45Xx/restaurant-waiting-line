import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        unique: true,
        required: true
    },
    ingredients:{
        type: String,
        max: 1500,
        required: true
    },
    price: {
        type: Number,
        min: 0
    }
})

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;

