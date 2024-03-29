import express from "express";

import foodRoute from "./food.route.js";
import queueRoute from "./queue.route.js";
import userRoute from "./user.route.js";
import userLogRoute from "./userLog.route.js";

const apiRouter = express.Router();

apiRouter.use("/food", foodRoute);
apiRouter.use("/queue", queueRoute);
apiRouter.use("/user", userRoute);
apiRouter.use(userLogRoute)

export default apiRouter;