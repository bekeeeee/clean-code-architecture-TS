"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseHttpResponse {
    constructor(data = {}, error = null, statusCode) {
        this.data = data;
        this.error = error;
        this.statusCode = statusCode;
    }
    static success(data, statusCode = 200) {
        return new BaseHttpResponse(data, null, statusCode);
    }
    static failed(msg, statusCode = 400) {
        return new BaseHttpResponse(null, msg, statusCode);
    }
}
exports.BaseHttpResponse = BaseHttpResponse;
