export declare class RedisService {
    private publisher;
    private subscriber;
    constructor();
    private handleConnection;
    publish(channel: string, message: string): Promise<void>;
    subscribe(channel: string, callback: (message: string) => void): Promise<void>;
}
