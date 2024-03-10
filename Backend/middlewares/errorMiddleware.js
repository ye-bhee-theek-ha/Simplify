const NotFound = (req, res, next) => {
    const error = new Error (`not found ${req.orignalUrl}`);
    res.status(400);
    next(error);
}

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? NULL : err.stack,
    });
}

module.exports = {NotFound, errHandler};