FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g turbo

COPY package*.json turbo.json ./
COPY apps ./apps

RUN npm ci --ignore-scripts
RUN npx prisma generate --schema=./apps/server/prisma/schema.prisma
RUN turbo build --filter=@todo/server

FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/server/package.json ./apps/server/
COPY --from=builder /app/apps/utils/package.json ./apps/utils/

COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/utils/dist ./apps/utils/dist

COPY --from=builder /app/apps/server/prisma ./apps/server/prisma

COPY apps/server/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN npm ci --omit=dev --ignore-scripts
RUN npx prisma generate --schema=./apps/server/prisma/schema.prisma

WORKDIR /app/apps/server

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
