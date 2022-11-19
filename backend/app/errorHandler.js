// 404 Error Handlers
const error404 = (req, res, next) => {
    const error = new Error("Resources Not Found!");
    error.status = 404;
    next(error);
}

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
    if(err.status === 404){
        return res.status(404).json({message: err.message})
    }

    res.status(500).json({message: err.message})
}


// Module Export
module.exports = {
    error404, globalErrorHandler
}