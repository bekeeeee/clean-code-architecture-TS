"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateSubscriberDto {
    constructor(id, name, channel) {
        this.id = id;
        this.name = name;
        this.channel = channel;
    }
    static from(body) {
        if (!body.id) {
            throw new Error('missing id property');
        }
        return new UpdateSubscriberDto(body.id, body.name, body.channel);
    }
}
exports.UpdateSubscriberDto = UpdateSubscriberDto;
