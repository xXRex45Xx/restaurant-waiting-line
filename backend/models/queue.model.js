import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    queueId: {
        type: Number,
        min: 0,
        unique: true,
        required: true
    },
    data: {
        foodList: [{foodId: mongoose.Types.ObjectId}],
        totalPrice: Number
    }
});

const QueueModel = mongoose.model('Queue', queueSchema);

export default QueueModel;