import express from "express";
import mongoose from "mongoose";

import Queue from "./utils/queue.util.js";
import Food from "./models/food.model.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) =>
{
    const mortodiella = new Food({
        name: 'Mortodiella',
        ingredients: 'a lotta things',
        price: 499.99
    });
    mortodiella.save();
    res.send("works");
})

app.use("/api", routes.apiRouter);

mongoose.connect('mongodb://127.0.0.1:27017/restaurantOrderDB')
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(5000, "localhost", () => console.log("Server Started"));
})
.catch(error => {
    throw error;
})