"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubscriberDto {
    constructor(id, name, channel, createdAt) {
        this.id = id;
        this.name = name;
        this.channel = channel;
        this.createdAt = createdAt;
    }
    static from(entity) {
        return new SubscriberDto(entity._id, entity.name, entity.channel, entity.createdAt);
    }
    static fromMany(subscribers) {
        return subscribers.map((subscriber) => SubscriberDto.from(subscriber));
    }
}
exports.SubscriberDto = SubscriberDto;
