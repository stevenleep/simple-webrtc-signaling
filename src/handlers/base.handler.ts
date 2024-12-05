import { Socket } from 'socket.io';
import { RedisService } from '../services/redis.service';
import { logger } from '../utils/logger';
import { REDIS_CHANNELS } from '../config/constants';

export abstract class BaseHandler {
  public constructor(
    protected socket: Socket,
    protected redisService: RedisService
  ) {}

  protected async publishToRoom(roomId: string, event: string, payload: any): Promise<void> {
    try {
      await this.redisService.publish(
        `${REDIS_CHANNELS.ROOM_PREFIX}${roomId}`,
        JSON.stringify({ event, payload })
      );
    } catch (error) {
      logger.error('Error publishing to room:', error);
    }
  }

  protected abstract initialize(): void;
} 