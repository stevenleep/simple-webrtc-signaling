export const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "join-room",
  USER_CONNECTED: "user-connected",
  ICE_CANDIDATE: "ice-candidate",
  OFFER: "offer",
  ANSWER: "answer",
  ROOM_USERS: "room-users",
} as const;

export const REDIS_CHANNELS = {
  ROOM_PREFIX: "room:",
  GLOBAL: "global",
} as const;

export const CONFIG = {
  REDIS: {
    HOST: process.env.REDIS_HOST || "localhost",
    PORT: Number(process.env.REDIS_PORT) || 6379,
    PASSWORD: process.env.REDIS_PASSWORD || "",
    RETRY_MAX_TIMEOUT: 2000,
    RETRY_INCREMENT: 50,
  },
  SERVER: {
    PORT: Number(process.env.PORT) || 3000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  },
} as const;
