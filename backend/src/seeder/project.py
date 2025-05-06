import random

from faker import Faker
from sqlalchemy.orm import Session

from src.database.postgres import SessionLocal
from src.models import Project

fake = Faker()



def insert_initial_data(db: Session):
    projects = []
    for _ in range(10):
        project = Project(
            name=fake.company(),
            project_type=random.choice(["solar", "wind", "hydroelectric"]),
            latitude=fake.latitude(),
            longitude=fake.longitude(),
        )
        projects.append(project)
    
    db.bulk_save_objects(projects)
    db.commit()