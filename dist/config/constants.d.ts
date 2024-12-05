export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly JOIN_ROOM: "join-room";
    readonly USER_CONNECTED: "user-connected";
    readonly ICE_CANDIDATE: "ice-candidate";
    readonly OFFER: "offer";
    readonly ANSWER: "answer";
};
export declare const REDIS_CHANNELS: {
    readonly ROOM_PREFIX: "room:";
    readonly GLOBAL: "global";
};
export declare const CONFIG: {
    readonly REDIS: {
        readonly HOST: string;
        readonly PORT: number;
        readonly RETRY_MAX_TIMEOUT: 2000;
        readonly RETRY_INCREMENT: 50;
    };
    readonly SERVER: {
        readonly PORT: number;
        readonly CORS_ORIGIN: string;
    };
};
