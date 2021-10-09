"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
    }
}
exports.HttpException = HttpException;
