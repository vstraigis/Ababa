# ABABA Movie App Deployment Guide

This guide will walk you through the steps to deploy the ABABA movie application using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system.
- The ABABA movie application source code, including the `docker-compose.yml`, `back-ababa-movie`, and `front-ababa-movie` directories.

## Deployment Steps

1. **Configure environment variables**

   In the `back-ababa-movie` directory, create an `.env` file with the following content:

   ```
   DATABASE_URL="postgresql://breakme:gimmeajob@db:5432/ababamovies"
   JWT_SECRET="2023SaipVISAIniekoTasDARBASbutuKaZn@20011105"
   OMDB_API_KEY="
   ```

   Replace the `JWT_SECRET` value with a suitable secret key for your application.

   Replace the `OMDB_API_KEY` value with your own API key from [OMDb API](http://www.omdbapi.com/).

2. **Build Docker images**

   Open a terminal, navigate to the directory containing the `docker-compose.yml` file, and run the following command:

   ```bash
   docker-compose build
   ```

   This command will build the Docker images for the frontend, backend, and database.

3. **Start the containers**

   In the same terminal, run the following command:

   ```bash
   docker-compose up -d
   ```

   This command will start the Docker containers for the frontend, backend, and database in the background.

4. **Apply database migrations**

   In the same terminal, run the following command:

   ```bash
   docker-compose exec backend npx prisma migrate deploy
   ```

   This command will apply the Prisma migrations to the database, creating the necessary tables and schema.

5. **Access the application**

   Open your web browser and navigate to `http://localhost:5173`. You should now see the ABABA movie application up and running.

## Stopping the Application

To stop the application and remove the containers, run the following command in the terminal:

```bash
docker-compose down
```

That's it! You have successfully deployed the ABABA movie application using Docker and Docker Compose.