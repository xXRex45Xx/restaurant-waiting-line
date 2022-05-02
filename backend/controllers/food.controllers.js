import FoodModel from "../models/food.model.js";

const GetAllFoods = async (req, res) => {
    const { q } = req.query;
    const products = await FoodModel.find(q ? { name: new RegExp(q) } : null);
    res.status(200).json(products);
}

const foodControllers = {
    GetAllFoods
}

export default foodControllers;