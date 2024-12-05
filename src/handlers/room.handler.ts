import { BaseHandler } from './base.handler';
import { REDIS_CHANNELS, SOCKET_EVENTS } from '../config/constants';
import { logger } from "../utils/logger"

export class RoomHandler extends BaseHandler {
  initialize(): void {
    this.handleJoinRoom();
  }

  private handleJoinRoom(): void {
    this.socket.on(
      SOCKET_EVENTS.JOIN_ROOM,
      async (roomId: string) => {
        try {
          await this.socket.join(roomId);

          // 通知房间其他用户
          this.socket.to(roomId).emit(SOCKET_EVENTS.USER_CONNECTED, this.socket.id);
          // 将用户和房间关联以后写入 Redis
          await this.redisService.addUserToRoom(roomId, this.socket.id);
   
          // 获取房间内所有用户
          const users = await this.redisService.getRoomUsers(roomId);
          this.socket.emit(SOCKET_EVENTS.ROOM_USERS, users);
          
          // 订阅房间频道
          await this.subscribeToRoom(roomId);

          logger.info(`User ${this.socket.id} joined room ${roomId}`);
        } catch (error) {
          logger.error('Error handling join room:', error);
        }
      }
    );
  }

  private async subscribeToRoom(roomId: string): Promise<void> {
    await this.redisService.subscribe(
      `${REDIS_CHANNELS.ROOM_PREFIX}${roomId}`,
      (message: string) => {
        const data = JSON.parse(message);
        console.log(data)
        this.socket.to(roomId).emit(data.event, data.payload);
      }
    );
  }
} 