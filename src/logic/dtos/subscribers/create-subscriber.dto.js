"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("@logic/exceptions");
class CreateSubscriberDto {
    constructor(name, channel) {
        this.name = name;
        this.channel = channel;
    }
    static from(body) {
        if (!body.channel) {
            throw new exceptions_1.ValidationException('Missing property channel');
        }
        if (!body.name) {
            throw new exceptions_1.ValidationException('Missing property name');
        }
        return new CreateSubscriberDto(body.name, body.channel);
    }
}
exports.CreateSubscriberDto = CreateSubscriberDto;
