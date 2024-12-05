import { Socket } from 'socket.io';
import { RedisService } from '../services/redis.service';
export declare abstract class BaseHandler {
    protected socket: Socket;
    protected redisService: RedisService;
    constructor(socket: Socket, redisService: RedisService);
    protected publishToRoom(roomId: string, event: string, payload: any): Promise<void>;
    protected abstract initialize(): void;
}
