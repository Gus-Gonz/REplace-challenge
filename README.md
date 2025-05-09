# Renewable Energy Projects - REPLACE

This project consists of a web application to visualize renewable energy projects (solar, wind, and hydroelectric). The application offers both a map view and a list view to explore available projects, with filtering options by energy type.

## Project Structure

The project is divided into:

- **Frontend**: React application with Redux for state management styled with Tailwind CSS.
- **Backend**: FASTAPI app that manages project data and provides endpoints for the frontend.

## Main Features

- Map view for geographic visualization of projects
- List view with details of each project
- Filtering by project type (solar, wind, hydroelectric)
- Dynamic switching between views
- Responsive design for different devices

## Prerequisites

- Python 3.13
- Poetry (Python dependency manager)
- Node.js v23
- Git

## Installation and Execution

1. Clone the repository:
   ```bash
   git clone {URL}
   cd replace-challenge
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ./backend
   ```

2. Create and activate a Poetry environment with Python 3.13:
   ```bash
   poetry env use 3.13
   poetry install
   ```

3. Start the backend development server:
   ```bash
   poetry run uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ./frontend
   ```

2. Install dependencies:
   ```bash
   npm i
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Accessing the Application

Once the servers are running:

- **Frontend**: Access the web application at [http://localhost:5173](http://localhost:5173)
- **Backend API**: Available at [http://localhost:8000/api](http://localhost:8000/api)

## Test Data

The backend uses a mock system to simulate a database. These test data are automatically loaded when the server starts and don't require a real database connection. The mocks include:

Solar energy projects
Wind energy projects
Hydroelectric projects

All these simulated data allow testing the application without needing to set up a database.

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
