"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const socket_io_1 = require("socket.io");
const redis_service_1 = require("./redis.service");
const room_handler_1 = require("../handlers/room.handler");
const webrtc_handler_1 = require("../handlers/webrtc.handler");
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
class SocketService {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: constants_1.CONFIG.SERVER.CORS_ORIGIN,
                methods: ['GET', 'POST']
            }
        });
        this.redisService = new redis_service_1.RedisService();
        this.initialize();
    }
    initialize() {
        this.io.on(constants_1.SOCKET_EVENTS.CONNECTION, (socket) => {
            logger_1.logger.info(`Client connected: ${socket.id}`);
            // 初始化各个处理器
            this.initializeHandlers(socket);
            socket.on(constants_1.SOCKET_EVENTS.DISCONNECT, () => {
                logger_1.logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }
    initializeHandlers(socket) {
        const handlers = [
            new room_handler_1.RoomHandler(socket, this.redisService),
            new webrtc_handler_1.WebRTCHandler(socket, this.redisService)
        ];
        handlers.forEach(handler => handler.initialize());
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map