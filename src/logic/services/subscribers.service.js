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
const subscribers_repository_1 = require("@data/subscribers.repository");
const dtos_1 = require("@logic/dtos");
const exceptions_1 = require("@logic/exceptions");
let SubscribersService = class SubscribersService {
    constructor(_subscribersRepo) {
        this._subscribersRepo = _subscribersRepo;
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            const subscribers = yield this._subscribersRepo.all();
            return dtos_1.SubscriberDto.fromMany(subscribers);
        });
    }
    findOne(getOneSubscriberDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundSubscriber = yield this._subscribersRepo.findOne(getOneSubscriberDto.id);
            if (!foundSubscriber) {
                throw new exceptions_1.CouldNotFindSubscriberException();
            }
            return dtos_1.SubscriberDto.from(foundSubscriber);
        });
    }
    create(createSubscriberDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSubscriber = yield this._subscribersRepo.create(createSubscriberDto);
            return dtos_1.SubscriberDto.from(createdSubscriber);
        });
    }
    updateOne(updateSubscriberDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Implement proper mapping?
            return this._subscribersRepo.updateOne({
                _id: updateSubscriberDto.id,
                channel: updateSubscriberDto.channel,
                name: updateSubscriberDto.name,
            });
        });
    }
    deleteOne({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._subscribersRepo.deleteOne(id);
            return true;
        });
    }
};
SubscribersService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [subscribers_repository_1.SubscribersRepository])
], SubscribersService);
exports.SubscribersService = SubscribersService;
