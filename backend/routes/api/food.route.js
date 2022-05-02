import express from "express";
import foodControllers from "../../controllers/food.controllers.js";

const foodRoute = express.Router();

foodRoute.route("/")
    .get(foodControllers.GetAllFoods)
    .post(foodControllers.AddFood);

foodRoute.route("/:foodId")
    .get(foodControllers.GetSpecificFood)
    .patch(foodControllers.UpdateFood)
    .delete(foodControllers.DeleteFood);

export default foodRoute;