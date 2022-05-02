import express from "express";

import queueControllers from "../../controllers/queue.controller.js";

const queueRoute = express.Router();

queueRoute.route("/")
    .get(queueControllers.GetAllQueue)
    .post((req, res) => {})
    .delete((req, res) => {});

queueRoute.delete((req, res) => {});

export default queueRoute;