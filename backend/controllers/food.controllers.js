import FoodModel from "../models/food.model.js";

const GetAllFoods = async (req, res) => {
    console.log(global.queue.getAllAsArray());
    const { q } = req.query;
    const foods = await FoodModel.find(q ? { name: new RegExp(q) } : null);
    res.status(200).json(foods);
}

const AddFood = async (req, res) => {
    const {food} = req.body;
    console.log(food);
    const newFood = new FoodModel(food);
    await newFood.save();
    res.status(200).json({success: true, insertedId: newFood._id});
}

const GetSpecificFood = async (req, res) => {
    const {foodId} = req.params;
    const food = await FoodModel.findById(foodId);
    res.status(200).json(food);
}

const UpdateFood = async (req, res) => {
    const {foodId} = req.params;
    const {food} = req.body;
    const updatedId = await FoodModel.findByIdAndUpdate(foodId, food, {runValidators: true});
    res.status(200).json({success: true, foodId: updatedId._id});
}

const DeleteFood = async (req, res) => {
    const {foodId} = req.params;
    await FoodModel.findByIdAndDelete(foodId);
    res.status(200).json({success: true});
}

const foodControllers = {
    GetAllFoods,
    AddFood,
    GetSpecificFood,
    UpdateFood,
    DeleteFood
}

export default foodControllers;