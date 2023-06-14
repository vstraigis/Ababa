# ABABA Movie App

ABABA Movie App is a web application that allows users to organize and manage their favorite films. Using a comprehensive database of films, users can easily search for movies, pick their favorites, and create a personalized library of movies they love. 

## Features

- **Search for movies**: The app provides an extensive database of films, making it easy for users to find the movies they're looking for.
- **Add favorite movies**: Users can pick their favorite movies and add them to their personalized favorites page. If a movie is already in their favorites, they can remove it with a single click. Also users can add their own movies if they do not exist in current database .
- **Rate movies**: Users can rate the movies they've added to their favorites, providing an easy way to remember the films they enjoyed the most.
- **Write overviews**: Users can write short overviews about the movies they've added to their favorites, summarizing their thoughts and impressions.
- **Sort**: The app provides sorting by year and rating, making it easy for users to find their favorite films in their library.
- **Implemented search**: Users can quickly search for movies among their picked favorites using the built-in search functionality.

## Usage

Once the app is deployed, simply navigate to the app in your web browser and create an account or log in. Search for movies using the search bar and add them to your favorites by clicking the "Add to Favorites" button. Your favorite movies will be displayed on your favorites page, where you can rate them, write overviews, and sort them by year and rating for easy access.

Discover and organize your favorite movies with the ABABA Movie App!

## Authentication with JWT

The ABABA Movie App implements authentication using JSON Web Tokens (JWT). This means that users need to create an account and log in to access the features and functionalities of the application.

When a user successfully logs in, they receive a JWT token, which is stored in the browser's local storage. This token is then used to authenticate subsequent API requests. The token contains a secure and encrypted payload that includes information about the user, such as their user ID and role.

The JWT token is sent in the header of each API request as a bearer token, allowing the backend to verify the user's identity and authorize their actions.

If a request is made without a valid JWT token or with an expired token, the backend will respond with an authentication error, and the user will be prompted to log in again.

By implementing authentication with JWT, the ABABA Movie App ensures that only authorized users can access and manage their favorite films, adding an extra layer of security to the application.

## Technology Stack

ABABA Movie App uses a modern, efficient, and robust technology stack to provide a seamless and enjoyable experience for its users.

- **React with Vite**: The frontend of the application is built using React, a popular and powerful JavaScript library for building user interfaces. Vite is used as the build tool and development server, providing fast development and optimized production builds.
- **Node.js**: The backend of the application runs on Node.js, a JavaScript runtime that allows for executing JavaScript code on the server-side, providing excellent performance and scalability.
- **Express.js**: Express.js is a minimal and flexible web application framework for Node.js, used to build the backend API for the ABABA Movie App. It simplifies server-side development and allows for easy integration with various middleware and database solutions.
- **PostgreSQL**: The application uses PostgreSQL, a powerful, enterprise-class, open-source relational database system. PostgreSQL provides excellent performance, reliability, and a robust feature set, making it a great choice for storing the application's data.
- **Prisma ORM**: Prisma is a next-generation ORM (Object-Relational Mapping) . It simplifies database access and management by providing a high-level, easy-to-use API for querying and manipulating the data. In ABABA Movie App, Prisma is used to interact with the PostgreSQL database.

The combination of these technologies ensures that the ABABA Movie App delivers a high-quality user experience, efficient performance, and a stable, maintainable codebase.

# Deployment Guide


This guide will walk you through the steps to deploy the ABABA movie application using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system.
- The ABABA movie application source code, including the `docker-compose.yml`, `back-ababa-movie`, and `front-ababa-movie` directories.

## Deployment Steps


   **Configure environment variables**

   In the `back-ababa-movie` directory, create an `.env` file with the following content:

   ```
   DATABASE_URL="postgresql://breakme:gimmeajob@db:5432/ababamovies"
   JWT_SECRET="2023SaipVISAIniekoTasDARBASbutuKaZn@20011105"
   OMDB_API_KEY="
   ```

   Replace the `JWT_SECRET` value with a suitable secret key for your application.

   Replace the `OMDB_API_KEY` value with your own API key from [OMDb API](http://www.omdbapi.com/).
   
   **On Linux and MacOS:**

   Run the following commands in the terminal:

   ```bash
   bash deploy.sh
   ```

   This will build the Docker images, start the containers and apply the database migrations.

   **On Windows:**
   

   1. **Build Docker images**

      Open a terminal, navigate to the directory containing the `docker-compose.yml` file, and run the following command:

      ```bash
      docker-compose build
      ```

      This command will build the Docker images for the frontend, backend, and database.

   2. **Start the containers**

      In the same terminal, run the following command:

      ```bash
      docker-compose up -d
      ```

      This command will start the Docker containers for the frontend, backend, and database in the background.

   3. **Apply database migrations**

      In the same terminal, run the following command:

      ```bash
      docker-compose exec backend npx prisma migrate deploy
      ```

      This command will apply the Prisma migrations to the database, creating the necessary tables and schema.

   4. **Access the application**

      Open your web browser and navigate to `http://localhost:5173`. You should now see the ABABA movie application up and running.

   5. **Stopping the Application**

      To stop the application and remove the containers, run the following command in the terminal:

      ```bash
      docker-compose down
      ```

That's it! You have successfully deployed the ABABA movie application using Docker and Docker Compose.
