import QueueModel from "../models/queue.model.js";
import FoodModel from "../models/food.model.js";

const GetAllQueue = async (req, res, next) => {
    res.status(200).json(global.queue);
}

const AddToQueue = async (req, res, next) => {
    const { foods } = req.body;
    let totalPrice = 0;
    for (let food of foods) {
        totalPrice += (await FoodModel.findById(food).select({ price: 1, _id: 0 })).price
    }
    global.queue.enQueue({ foodList: foods, totalPrice });
    res.status(200).json({ success: true });
    await QueueModel.deleteMany({});
    await new QueueModel(
        {
            queueId: global.queue.count - 1,
            data: global.queue.peepBack()
        }).save();
}

const ClearQueue = async (req, res, next) => {
    global.queue.empty();
    await QueueModel.deleteMany({});
    res.status(200).json({ success: true });
}

const Dequeue = async (req, res, next) => {
    const removedId = global.queue.deQueue();
    res.status(200).json({ success: true, data: removedId});
    await QueueModel.deleteMany({});
    QueueModel.insertMany(global.queue.getAllAsArray());
}

const queueControllers = {
    GetAllQueue,
    AddToQueue,
    ClearQueue,
    Dequeue
}

export default queueControllers;
