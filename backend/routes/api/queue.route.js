import express from "express";

import queueControllers from "../../controllers/queue.controller.js";
import wrapAsync from "../../utils/error/wrap-async.util.js";

const queueRoute = express.Router();

queueRoute.route("/")
    .get(wrapAsync(queueControllers.GetAllQueue))
    .post(wrapAsync(queueControllers.AddToQueue))
    .delete(wrapAsync(queueControllers.ClearQueue));

queueRoute.delete("/dequeue",wrapAsync(queueControllers.Dequeue));

export default queueRoute;