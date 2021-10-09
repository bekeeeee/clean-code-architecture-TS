"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationException extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ValidationException = ValidationException;
