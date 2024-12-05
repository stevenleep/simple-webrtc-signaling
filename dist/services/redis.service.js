"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("../config/constants");
const logger_1 = require("../utils/logger");
class RedisService {
    constructor() {
        const redisConfig = {
            host: constants_1.CONFIG.REDIS.HOST,
            port: constants_1.CONFIG.REDIS.PORT,
            retryStrategy: (times) => Math.min(times * constants_1.CONFIG.REDIS.RETRY_INCREMENT, constants_1.CONFIG.REDIS.RETRY_MAX_TIMEOUT),
        };
        this.publisher = new ioredis_1.default(redisConfig);
        this.subscriber = new ioredis_1.default(redisConfig);
        this.handleConnection();
    }
    handleConnection() {
        this.publisher.on('error', (err) => logger_1.logger.error('Redis Publisher Error:', err));
        this.subscriber.on('error', (err) => logger_1.logger.error('Redis Subscriber Error:', err));
    }
    async publish(channel, message) {
        try {
            await this.publisher.publish(channel, message);
        }
        catch (error) {
            logger_1.logger.error('Redis Publish Error:', error);
        }
    }
    async subscribe(channel, callback) {
        try {
            await this.subscriber.subscribe(channel);
            this.subscriber.on('message', (ch, message) => {
                if (ch === channel) {
                    callback(message);
                }
            });
        }
        catch (error) {
            logger_1.logger.error('Redis Subscribe Error:', error);
        }
    }
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map