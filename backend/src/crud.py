from sqlalchemy.orm import Session
from src import models

def get_projects(db: Session, project_type: str = None):
    query = db.query(models.Project)
    if project_type:
        query = query.filter(models.Project.project_type == project_type.lower())
    return query.all()
