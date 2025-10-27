
# Full-Stack Kanban Board

A complete Kanban board application built with a NestJS backend and a React/Redux frontend. This project is containerized using Docker for easy deployment.

## 🚀 Live Demo

You can view a live deployment of this project at:
**[https://gitsheet.xyz/](https://gitsheet.xyz/)**

-----

## 🛠️ Tech Stack

  * **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)
  * **Frontend:** [React](https://reactjs.org/)
  * **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
  * **Database:** [PostgreSQL](https://www.postgresql.org/)
  * **Containerization:** [Docker](https://www.docker.com/) & Docker Compose


-----


## 🏁 Getting Started & How to Run

There are two primary ways to run this project:

1.  **Using Docker Compose (Recommended):** This runs the entire application stack (client, server, db) as defined in the `docker-compose.yml`. This is the easiest way to get started.
2.  **Manual Local Development:** This involves running the client and server separately on your local machine, which is ideal for active development and debugging.

### Prerequisites

  * [Git](https://git-scm.com/)
  * [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
  * [Docker](https://www.docker.com/products/docker-desktop/) & [Docker Compose](https://docs.docker.com/compose/)

-----

### 1\. Environment Variables

Before you can run the project, you must set up your environment variables. The `docker-compose.yml` file is configured to look for a file at `apps/server/.env.production`.

1.  Navigate to the `apps/server/` directory.
2.  Create a new file named `.env.production`.
3.  Add the necessary variables. This file is used by *both* the server and the client containers.


### 2\. How to Run with Docker (Production-like)

This method uses the `docker-compose.yml` file to build and run all services. This is how you would run it on your server before pointing Nginx to it.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/matshp0/Kanban-todo
    cd Kanban-todo
    ```

2.  **Create the environment file:**
    Make sure you have created the `apps/server/.env.production` file as described in the step above.

3.  **Build and run the containers:**

    ```bash
    docker-compose up --build -d
    ```

      * `--build` forces Docker to rebuild your `server` and `client` images.
      * `-d` runs the containers in detached mode (in the background).


  * **Client:** `http://localhost:8091`
  * **Server:** `http://localhost:8093`
  * **Database:** `http://localhost:8092`
