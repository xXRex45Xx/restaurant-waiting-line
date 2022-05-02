import express from "express";

import userControllers from "../../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.route("/")
    .get(userControllers.GetAllUsers)
    .post((req, res) => {});

userRoute.route("/:userId")
    .get((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});

export default userRoute;