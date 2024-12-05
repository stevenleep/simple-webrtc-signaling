"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.REDIS_CHANNELS = exports.SOCKET_EVENTS = void 0;
exports.SOCKET_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    JOIN_ROOM: "join-room",
    USER_CONNECTED: "user-connected",
    ICE_CANDIDATE: "ice-candidate",
    OFFER: "offer",
    ANSWER: "answer",
};
exports.REDIS_CHANNELS = {
    ROOM_PREFIX: "room:",
    GLOBAL: "global",
};
exports.CONFIG = {
    REDIS: {
        HOST: process.env.REDIS_HOST || "localhost",
        PORT: Number(process.env.REDIS_PORT) || 6379,
        RETRY_MAX_TIMEOUT: 2000,
        RETRY_INCREMENT: 50,
    },
    SERVER: {
        PORT: Number(process.env.PORT) || 3000,
        CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
    },
};
//# sourceMappingURL=constants.js.map