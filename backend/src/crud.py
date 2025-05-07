from sqlalchemy.orm import Session
from src import models
from typing import List, Optional

def get_projects(db: Session, project_types: Optional[List[str]] = None):
    query = db.query(models.Project)
    if project_types:
        query = query.filter(models.Project.project_type.in_([p_type.lower() for p_type in project_types]))
    
    query = query.order_by(models.Project.id.desc())
    return query.all()