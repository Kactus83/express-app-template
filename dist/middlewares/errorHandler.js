"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
