from fastapi import FastAPI
from src.routers import projects
from src.database.postgres import engine, Base
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Renewable Energy Projects API")

Base.metadata.create_all(bind=engine)

app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)