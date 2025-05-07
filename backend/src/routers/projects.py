from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from src import schemas, crud
from src.database.postgres import SessionLocal

router = APIRouter()

def get_db():
    try:
        with SessionLocal() as db:
            yield db
    except Exception as e:
        raise e

@router.get("/", response_model=List[schemas.Project])
def list_projects(
    project_type: Optional[List[str]] = Query(
        None, 
        description="Filter projects by type(s). Multiple values can be provided.", 
        enum=["solar", "wind", "hydroelectric"]
    ),
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of projects from the database.

    Args:
        project_type (Optional[List[str]]): Filter projects by type(s). Multiple values allowed.
        db (Session): Database session dependency.
    Returns:
        List[schemas.Project]: A list of project objects.
    """
    return crud.get_projects(db, project_types=project_type)
