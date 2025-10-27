FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g turbo

COPY package*.json turbo.json ./

COPY apps ./apps

RUN npm ci

RUN turbo build --filter=@todo/client

FROM nginx:alpine

COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
