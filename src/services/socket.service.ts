import { Server, Socket } from 'socket.io';
import { RedisService } from './redis.service';
import { RoomHandler } from '../handlers/room.handler';
import { WebRTCHandler } from '../handlers/webrtc.handler';
import { SOCKET_EVENTS, CONFIG } from '../config/constants';
import { logger } from '../utils/logger';

export class SocketService {
  private io: Server;
  private redisService: RedisService;

  constructor(server: any, redisService: RedisService) {
    this.io = new Server(server, {
      cors: {
        origin: CONFIG.SERVER.CORS_ORIGIN,
        methods: ['GET', 'POST']
      }
    });

    this.redisService = redisService;
    this.initialize();
  }

  private initialize(): void {
    this.io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
      logger.info(`Client connected: ${socket.id}`);

      // 初始化各个处理器
      this.initializeHandlers(socket);
      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        logger.info(`Client disconnected: ${socket.id}`);
        this.redisService.removeUserFromRoom(socket.id, "2002");
      });
    });
  }

  private initializeHandlers(socket: Socket): void {
    const handlers = [
      new RoomHandler(socket, this.redisService),
      new WebRTCHandler(socket, this.redisService)
    ];

    handlers.forEach(handler => handler.initialize());
  }
} 