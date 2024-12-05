FROM hub.geekery.cn/node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force && \
    npm install --registry=https://registry.npmmirror.com

COPY . .
RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"] 