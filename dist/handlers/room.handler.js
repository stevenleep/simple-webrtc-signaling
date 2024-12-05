"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomHandler = void 0;
const base_handler_1 = require("./base.handler");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
class RoomHandler extends base_handler_1.BaseHandler {
    initialize() {
        this.handleJoinRoom();
    }
    handleJoinRoom() {
        this.socket.on(constants_1.SOCKET_EVENTS.JOIN_ROOM, async (roomId, userId) => {
            try {
                await this.socket.join(roomId);
                // 通知房间其他用户
                this.socket.to(roomId).emit(constants_1.SOCKET_EVENTS.USER_CONNECTED, userId);
                // 订阅房间频道
                await this.subscribeToRoom(roomId);
                logger_1.logger.info(`User ${userId} joined room ${roomId}`);
            }
            catch (error) {
                logger_1.logger.error('Error handling join room:', error);
            }
        });
    }
    async subscribeToRoom(roomId) {
        await this.redisService.subscribe(`${constants_1.REDIS_CHANNELS.ROOM_PREFIX}${roomId}`, (message) => {
            const data = JSON.parse(message);
            this.socket.to(roomId).emit(data.event, data.payload);
        });
    }
}
exports.RoomHandler = RoomHandler;
//# sourceMappingURL=room.handler.js.map