import express from "express";

import queueControllers from "../../controllers/queue.controller.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";
import employeeAuthorization from "../../middlewares/employeeAuthorization.middleware.js";

const queueRoute = express.Router();

queueRoute.route("/")
    .get(wrapAsync(employeeAuthorization), wrapAsync(queueControllers.GetAllQueue))
    .post(wrapAsync(employeeAuthorization), wrapAsync(queueControllers.AddToQueue))
    .delete(wrapAsync(employeeAuthorization), wrapAsync(queueControllers.ClearQueue));

queueRoute.delete("/dequeue", wrapAsync(employeeAuthorization), wrapAsync(queueControllers.Dequeue));

export default queueRoute;