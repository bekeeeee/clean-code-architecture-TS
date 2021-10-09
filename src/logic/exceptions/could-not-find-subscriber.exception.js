"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CouldNotFindSubscriberException extends Error {
    constructor() {
        super('Missing subscriber');
    }
}
exports.CouldNotFindSubscriberException = CouldNotFindSubscriberException;
