import express from "express";
import mongoose from "mongoose";

import Queue from "./utils/queue.util.js";
import QueueModel from "./models/queue.model.js";
import Food from "./models/food.model.js";
import routes from "./routes/index.js";
import AppError from "./utils/error/app-error.util.js"
import path from "path"
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/src"));

app.get("/", (req, res, next) =>
{
    res.render("user-pages/main.page.ejs");
})

app.use("/api", routes.apiRouter);

app.get("/login", (req, res, next) => {
    
})

app.all("*", async(req, res, next) => {
    next(new AppError("Not Found", 404));
})

app.use(async (err, req, res, next) => {
    const {statusCode = 500} = err;
    res.status(statusCode).json({
        name: err.name,
        stack: err.stack,
        message: err.message
    });
})

mongoose.connect('mongodb://127.0.0.1:27017/restaurantOrderDB')
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(5000, "localhost", async() => {
        global.queue = new Queue(await QueueModel.find().select({ __v: 0}));
        // console.log(await QueueModel.find());
        console.log("Server Started");
    });
})