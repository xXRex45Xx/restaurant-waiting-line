import express from "express";

import userControllers from "../../controllers/user.controller.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";

const userRoute = express.Router();

userRoute.route("/")
    .get(wrapAsync(userControllers.GetAllUsers))
    .post(wrapAsync(userControllers.AddUser));

userRoute.route("/:userId")
    .get(wrapAsync(userControllers.GetSpecificUser))
    .patch(wrapAsync(userControllers.UpdateUser))
    .delete(wrapAsync(userControllers.DeleteUser));

export default userRoute;