#!/bin/bash

# Build Docker images
echo "Building Docker images..."
docker-compose build

# Start the containers
echo "Starting containers..."
docker-compose up -d

# Apply database migrations
echo "Applying database migrations..."
docker-compose exec backend npx prisma migrate deploy

# Print success message
echo "ABABA Movie App is now up and running!"