import express from "express";
import wrapAsync from "../../utils/error/wrap-async.util.js";
import UserLogControllers from "../../controllers/userLog.controllers.js";

const userLogRoute = express.Router();

userLogRoute.post("/login", wrapAsync(UserLogControllers.login));
userLogRoute.get("/logout", wrapAsync(UserLogControllers.logout));
userLogRoute.post("/changepass", wrapAsync(UserLogControllers.changePassword));
userLogRoute.get("/currentuser", wrapAsync(UserLogControllers.getLoggedInUser));

export default userLogRoute;