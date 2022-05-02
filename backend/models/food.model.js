import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255
    },
    ingredients:{
        type: String,
        max: 1500
    },
    price: {
        type: Number,
        min: 0
    }
})

const FoodModel = mongoose.model('Food', foodSchema);

export default FoodModel;

