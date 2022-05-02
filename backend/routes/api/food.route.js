import express from "express";
import foodControllers from "../../controllers/food.controllers.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";

const foodRoute = express.Router();

foodRoute.route("/")
    .get(wrapAsync(foodControllers.GetAllFoods))
    .post(wrapAsync(foodControllers.AddFood));

foodRoute.route("/:foodId")
    .get(wrapAsync(foodControllers.GetSpecificFood))
    .patch(wrapAsync(foodControllers.UpdateFood))
    .delete(wrapAsync(foodControllers.DeleteFood));

export default foodRoute;