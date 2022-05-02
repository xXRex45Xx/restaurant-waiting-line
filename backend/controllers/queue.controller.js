import QueueModel from "../models/queue.model.js";

const GetAllQueue = async (req, res, next) => {
    const queue = QueueModel.find();
    res.status(200).json(queue);
}

const queueControllers = {
    GetAllQueue
}

export default queueControllers;
