"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_middleware_1 = require("@web/lib/base-middleware");
class ValidateRequestMiddleware extends base_middleware_1.BaseMiddleware {
    constructor(_DtoClass, _withParams = false) {
        super();
        this._DtoClass = _DtoClass;
        this._withParams = _withParams;
    }
    execute(req, _, next) {
        if (this._withParams) {
            req.body = Object.assign(Object.assign({}, req.body), req.params);
        }
        req.body = this._DtoClass.from(req.body);
        next();
    }
    static with(dto) {
        return new ValidateRequestMiddleware(dto, false).execute;
    }
    static withParams(dto) {
        return new ValidateRequestMiddleware(dto, true).execute;
    }
}
exports.ValidateRequestMiddleware = ValidateRequestMiddleware;
