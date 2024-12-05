"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
// 定义日志格式
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
}));
// 创建 logger 实例
exports.logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: [
        // 控制台输出
        new winston_1.default.transports.Console(),
        // 文件输出
        new winston_1.default.transports.File({
            filename: 'error.log',
            level: 'error',
            dirname: 'logs'
        }),
        new winston_1.default.transports.File({
            filename: 'combined.log',
            dirname: 'logs'
        })
    ]
});
// 非生产环境下添加更详细的日志
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple()
    }));
}
//# sourceMappingURL=logger.js.map