"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetOneSubscriberDto {
    constructor(id) {
        this.id = id;
    }
    static from(body) {
        if (!body.id) {
            throw new Error('missing id property');
        }
        return new GetOneSubscriberDto(body.id);
    }
}
exports.GetOneSubscriberDto = GetOneSubscriberDto;
