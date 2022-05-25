import AppError from "../utils/error/app-error.util.js";

export default async (req, res, next) => {
    if(req.session.user && !req.session.user.isAdmin)
        return next();
    next(new AppError("Access Unauthorized!", 401));
}