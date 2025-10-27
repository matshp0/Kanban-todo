FROM node:20-alpine AS builder

WORKDIR /app

# Install turbo
RUN npm install -g turbo

# Copy root workspace config
COPY package*.json turbo.json ./

# Copy workspace packages
COPY apps ./apps

# Install dependencies from root
RUN npm ci

# Build with turbo (handles dependencies automatically)
RUN turbo build --filter=@todo/client

# Production stage
FROM nginx:alpine

COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
