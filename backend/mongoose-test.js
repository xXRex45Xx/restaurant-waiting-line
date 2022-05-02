import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title: String,
})

mongoose.connect('mongodb://127.0.0.1:2707/restaurantOrderDB')
.then(() => {
    console.log("Database Connected Successfully");
})
.catch(error => {
    console.log(error);
})

