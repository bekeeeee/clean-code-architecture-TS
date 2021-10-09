"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const subscribers_service_1 = require("@logic/services/subscribers.service");
const dtos_1 = require("@logic/dtos");
const validate_request_middleware_1 = require("@web/middlewares/validate-request.middleware");
const base_http_response_1 = require("@web/lib/base-http-response");
let SubscribersController = class SubscribersController {
    constructor(_service) {
        this._service = _service;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = yield this._service.all();
            const response = base_http_response_1.BaseHttpResponse.success(subscribers);
            res.json(response);
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = yield this._service.findOne(req.body);
            const response = base_http_response_1.BaseHttpResponse.success(subscriber);
            res.json(response);
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriber = yield this._service.create(req.body);
            const response = base_http_response_1.BaseHttpResponse.success(subscriber, 201);
            res.status(response.statusCode).json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.updateOne(req.body);
            const response = base_http_response_1.BaseHttpResponse.success({}, 200);
            res.status(response.statusCode).json(response);
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.deleteOne(req.body);
            const response = base_http_response_1.BaseHttpResponse.success({}, 200);
            res.status(response.statusCode).json(response);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribersController.prototype, "index", null);
__decorate([
    inversify_express_utils_1.httpGet('/:id', validate_request_middleware_1.ValidateRequestMiddleware.withParams(dtos_1.GetOneSubscriberDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribersController.prototype, "show", null);
__decorate([
    inversify_express_utils_1.httpPost('/', validate_request_middleware_1.ValidateRequestMiddleware.with(dtos_1.CreateSubscriberDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribersController.prototype, "store", null);
__decorate([
    inversify_express_utils_1.httpPatch('/:id', validate_request_middleware_1.ValidateRequestMiddleware.withParams(dtos_1.UpdateSubscriberDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribersController.prototype, "update", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:id', validate_request_middleware_1.ValidateRequestMiddleware.withParams(dtos_1.GetOneSubscriberDto)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribersController.prototype, "destroy", null);
SubscribersController = __decorate([
    inversify_express_utils_1.controller('/subscribers'),
    __metadata("design:paramtypes", [subscribers_service_1.SubscribersService])
], SubscribersController);
exports.SubscribersController = SubscribersController;
