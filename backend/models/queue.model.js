import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    queueId: {
        type: Number,
        min: 0,
        required: true
    },
    data: {
        foodList: [mongoose.Types.ObjectId],
        totalPrice: Number
    }
});

const QueueModel = mongoose.model('Queue', queueSchema);

export default QueueModel;