from fastapi import FastAPI
from src.routers import projects
from src.database.postgres import engine, Base

app = FastAPI(title="Renewable Energy Projects API")

Base.metadata.create_all(bind=engine)

app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
