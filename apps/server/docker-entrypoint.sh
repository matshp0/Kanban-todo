#!/bin/sh
set -e

echo "Waiting for database connection..."
npx prisma migrate deploy

echo "Starting NestJS server..."
exec node dist/main.js
