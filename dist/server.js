"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_service_1 = require("./services/socket.service");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
new socket_service_1.SocketService(httpServer);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map