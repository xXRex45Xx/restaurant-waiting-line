const wrapAsync = (fn) => {
    return async (req ,res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}

export default wrapAsync;