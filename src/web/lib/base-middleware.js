"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseMiddleware {
    constructor() {
        this.execute = this.execute.bind(this);
    }
}
exports.BaseMiddleware = BaseMiddleware;
