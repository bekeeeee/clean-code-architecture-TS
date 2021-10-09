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
const inversify_1 = require("inversify");
const db_context_1 = require("@data/db.context");
let SubscribersRepository = class SubscribersRepository {
    constructor(_dbContext) {
        this._dbContext = _dbContext;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.subscriber.find({});
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.subscriber
                .findById(id)
                .then((entity) => entity)
                .catch(() => {
                return null;
            });
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.subscriber.create(entity);
        });
    }
    updateOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundSubscriber = yield this._dbContext.subscriber.findById(payload._id);
            if (!foundSubscriber) {
                throw new Error('subscriber does not exist');
            }
            if (payload.name) {
                foundSubscriber.name = payload.name;
            }
            if (payload.channel) {
                foundSubscriber.channel = payload.channel;
            }
            foundSubscriber.save();
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._dbContext.subscriber.deleteOne({ _id: id });
        });
    }
};
SubscribersRepository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [db_context_1.DBContext])
], SubscribersRepository);
exports.SubscribersRepository = SubscribersRepository;
