import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import Queue from "./utils/queue.util.js";
import QueueModel from "./models/queue.model.js";
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

app.use(session({
    name: "sess",
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000
    }
}))

app.get("/", (req, res, next) =>
{
    res.render("user-pages/main.page.ejs");
})

app.use("/api", routes.apiRouter);

app.all("*", async(req, res, next) => {
    next(new AppError("Not Found", 404));
})

app.use(async (err, req, res, next) => {
    const {statusCode = 500} = err;
    res.status(statusCode).json({
        name: err.name,
        message: err.message
    });
})

mongoose.connect('mongodb://127.0.0.1:27017/restaurantOrderDB')
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(5000, "localhost", async() => {
        global.queue = new Queue(await QueueModel.find().select({ __v: 0}));
        console.log("Server Started");
    });
})
.catch(() => console.log("Database Connection Failed!"));