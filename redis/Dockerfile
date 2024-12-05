FROM hub.geekery.cn/redis:alpine

# 复制自定义配置文件（如果有）
COPY redis.conf /usr/local/etc/redis/redis.conf

# 启动 Redis 并使用自定义配置文件
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]