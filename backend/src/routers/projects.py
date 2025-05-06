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
    project_type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of projects from the database.

    Args:
        project_type (Optional[str]): Filter projects by type.
        db (Session): Database session dependency.
    Returns:
        List[schemas.Project]: A list of project objects.
    """
    return crud.get_projects(db, project_type=project_type)
