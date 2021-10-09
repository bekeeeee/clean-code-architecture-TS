"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const db_context_1 = require("@data/db.context");
const abstract_application_1 = require("@web/lib/abstract-application");
const subscribers_repository_1 = require("@data/subscribers.repository");
const subscribers_service_1 = require("@logic/services/subscribers.service");
require("@web/controllers/subscribers.controller");
const exceptions_1 = require("@logic/exceptions");
const base_http_response_1 = require("./lib/base-http-response");
const morgan_1 = __importDefault(require("morgan"));
class App extends abstract_application_1.Application {
    constructor() {
        super({
            containerOpts: {
                defaultScope: 'Singleton',
            },
            morgan: {
                mode: abstract_application_1.MorganMode.DEV,
            },
        });
    }
    configureServices(container) {
        container.bind(db_context_1.DBContext).toSelf();
        container.bind(subscribers_repository_1.SubscribersRepository).toSelf();
        container.bind(subscribers_service_1.SubscribersService).toSelf();
    }
    setup(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _db = this.container.get(db_context_1.DBContext);
            yield _db.connect();
            const server = new inversify_express_utils_1.InversifyExpressServer(this.container);
            server.setErrorConfig((app) => {
                app.use((err, req, res, next) => {
                    if (err instanceof exceptions_1.ValidationException) {
                        // NOTE: Fixed this after the video, should 've been 422!
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 422);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof exceptions_1.CouldNotFindSubscriberException) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 404);
                        return res.status(response.statusCode).json(response);
                    }
                    if (err instanceof Error) {
                        const response = base_http_response_1.BaseHttpResponse.failed(err.message, 500);
                        return res.status(response.statusCode).json(response);
                    }
                    next();
                });
            });
            server.setConfig((app) => {
                app.use(express_1.default.json());
                app.use(morgan_1.default(options.morgan.mode));
            });
            const app = server.build();
            app.listen(process.env.PORT, () => {
                console.log(`server is running on http://localhost:${process.env.PORT}/subscribers`);
            });
        });
    }
}
exports.App = App;
new App();
