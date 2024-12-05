"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
const logger_1 = require("../utils/logger");
const constants_1 = require("../config/constants");
class BaseHandler {
    constructor(socket, redisService) {
        this.socket = socket;
        this.redisService = redisService;
    }
    async publishToRoom(roomId, event, payload) {
        try {
            await this.redisService.publish(`${constants_1.REDIS_CHANNELS.ROOM_PREFIX}${roomId}`, JSON.stringify({ event, payload }));
        }
        catch (error) {
            logger_1.logger.error('Error publishing to room:', error);
        }
    }
}
exports.BaseHandler = BaseHandler;
//# sourceMappingURL=base.handler.js.map