import express from "express";

import userControllers from "../../controllers/user.controller.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";
import adminAuthorization from "../../middlewares/adminAuthorization.middleware.js";

const userRoute = express.Router();

userRoute.route("/")
    .get(wrapAsync(adminAuthorization), wrapAsync(userControllers.GetAllUsers))
    .post(wrapAsync(adminAuthorization), wrapAsync(userControllers.AddUser));

userRoute.route("/:userId")
    .get(wrapAsync(adminAuthorization), wrapAsync(userControllers.GetSpecificUser))
    .patch(wrapAsync(adminAuthorization), wrapAsync(userControllers.UpdateUser))
    .delete(wrapAsync(adminAuthorization), wrapAsync(userControllers.DeleteUser));

export default userRoute;