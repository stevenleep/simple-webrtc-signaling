import express from "express";
import { createServer } from "http";
import { SocketService } from "./services/socket.service";
import { RedisService } from "./services/redis.service";
import { logger } from "./utils/logger";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  try {
    // 初始化 Redis 服务
    const redisService = new RedisService();

    // 初始化 Socket.IO 服务
    const socketService = new SocketService(httpServer, redisService);

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    // 优雅关闭
    process.on("SIGTERM", async () => {
      logger.info("SIGTERM received. Closing server...");
      await redisService.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer().catch((error) => {
  logger.error("Server startup error:", error);
  process.exit(1);
});
