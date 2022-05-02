import express from "express";

import queueControllers from "../../controllers/queue.controller.js";

const queueRoute = express.Router();

queueRoute.route("/")
    .get(queueControllers.GetAllQueue)
    .post(queueControllers.AddToQueue)
    .delete(queueControllers.ClearQueue);

queueRoute.delete("/dequeue",queueControllers.Dequeue);

export default queueRoute;