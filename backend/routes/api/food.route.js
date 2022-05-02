import express from "express";
import foodControllers from "../../controllers/food.controllers.js";

const foodRoute = express.Router();

foodRoute.route("/")
    .get(foodControllers.GetAllFoods)
    .post((req, res) => {});

foodRoute.route("/:foodId")
    .get((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});

export default foodRoute;