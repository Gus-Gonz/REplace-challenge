# Renewable Energy Projects - REPLACE

This project consists of a web application to visualize renewable energy projects (solar, wind, and hydroelectric). The application offers both a map view and a list view to explore available projects, with filtering options by energy type.

## Project Structure

The project is divided into:

- **Frontend**: React application with Redux for state management styled with Tailwind CSS.
- **Backend**: FASTAPI app that manages project data and provides endpoints for the frontend.
- **Database**: PostgreSQL

## Main Features

- Map view for geographic visualization of projects
- List view with details of each project
- Filtering by project type (solar, wind, hydroelectric)
- Dynamic switching between views
- Responsive design for different devices

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git

## Installation and Execution

1. Clone the repository:
   ```bash
   git clone {URL}
   cd replace
   ```

2. Start services with Docker Compose:
   ```bash
   docker-compose up
   ```

This command will launch both the frontend and backend. The backend includes a seeder that will automatically load 10 sample projects into the database.

## Accessing the Application

Once the containers are running:

- **Frontend**: Access the web application at [http://localhost:3000](http://localhost:3000)
- **Backend API**: Available at [http://localhost:8000/api](http://localhost:8000/api)

## Initial Data

When starting for the first time, the backend will automatically run a seeder that loads 10 sample projects into the database, including:
- Solar projects
- Wind projects
- Hydroelectric projects

Each project contains information such as name, location, and type.


### Environment Variables

Backend: 

  ```bash
  DB_NAME=replace_db
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_HOST=db
  DB_PORT=5432
  ```

Frontend (passed as a build ARG): 

  ```bash
  VITE_API_BASE_URL=http://localhost:8000/api
  ```

### Useful Commands

- **View container logs**:
  ```bash
  docker-compose logs
  ```

- **Restart services**:
  ```bash
  docker-compose restart
  ```

- **Stop services**:
  ```bash
  docker-compose down
  ```
