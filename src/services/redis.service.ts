import Redis from "ioredis";
import { CONFIG } from "../config/constants";
import { logger } from "../utils/logger";
import { REDIS_CHANNELS } from '../config/constants';

export class RedisService {
  private publisher: Redis;
  private subscriber: Redis;

  constructor() {
    const redisConfig = {
      host: CONFIG.REDIS.HOST,
      port: CONFIG.REDIS.PORT,
      password: CONFIG.REDIS.PASSWORD,
      retryStrategy: (times: number) =>
        Math.min(
          times * CONFIG.REDIS.RETRY_INCREMENT,
          CONFIG.REDIS.RETRY_MAX_TIMEOUT
        ),
      connectTimeout: 10000,
      enableReadyCheck: true,
      maxRetriesPerRequest: null,
      retryUnfulfilledCommands: true,
    };

    this.publisher = new Redis(redisConfig);
    this.subscriber = new Redis(redisConfig);

    this.handleConnection();
  }

  private handleConnection() {
    this.publisher.on("error", (err) =>
      logger.error("Redis Publisher Error:", err)
    );
    this.subscriber.on("error", (err) =>
      logger.error("Redis Subscriber Error:", err)
    );
  }

  async publish(channel: string, message: string) {
    try {
      await this.publisher.publish(channel, message);
    } catch (error) {
      logger.error("Redis Publish Error:", error);
    }
  }

  async subscribe(channel: string, callback: (message: string) => void) {
    try {
      await this.subscriber.subscribe(channel);
      this.subscriber.on("message", (ch, message) => {
        if (ch === channel) {
          callback(message);
        }
      });
    } catch (error) {
      logger.error("Redis Subscribe Error:", error);
    }
  }

  async close() {
    await this.publisher.quit();
    await this.subscriber.quit();
  }

  async addUserToRoom(roomId: string, socketId: string) {
   // 将socketId添加到roomId的集合中，表示该用户加入了该房间
    const key = `${REDIS_CHANNELS.ROOM_PREFIX}${roomId}`;
    await this.publisher.sadd(key, socketId);
  }

  async removeUserFromRoom(socketId: string, roomId: string) {
    // 将socketId从所有房间中移除
    const key = `${REDIS_CHANNELS.ROOM_PREFIX}${roomId}`;
    await this.publisher.srem(key, socketId);
  }

  async getRoomUsers(roomId: string): Promise<string[]> {
    const key = `${REDIS_CHANNELS.ROOM_PREFIX}${roomId}`;
    return await this.publisher.smembers(key);
  }

  async getGlobalUsers(): Promise<string[]> {
    return await this.publisher.smembers(REDIS_CHANNELS.GLOBAL);
  }
}
