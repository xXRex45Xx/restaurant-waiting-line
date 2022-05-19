import express from "express";
import foodControllers from "../../controllers/food.controllers.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";
import userAuthorization from "../../middlewares/userAuthorization.middleware.js";    
import adminAuthorization from "../../middlewares/adminAuthorization.middleware.js";

const foodRoute = express.Router();

foodRoute.route("/")
    .get(wrapAsync(userAuthorization), wrapAsync(foodControllers.GetAllFoods))
    .post(wrapAsync(adminAuthorization),wrapAsync(foodControllers.AddFood));

foodRoute.route("/:foodId")
    .get(wrapAsync(userAuthorization), wrapAsync(foodControllers.GetSpecificFood))
    .patch(wrapAsync(adminAuthorization), wrapAsync(foodControllers.UpdateFood))
    .delete(wrapAsync(adminAuthorization), wrapAsync(foodControllers.DeleteFood));

export default foodRoute;