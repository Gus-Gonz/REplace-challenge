import random

from faker import Faker
from sqlalchemy.orm import Session

from src.database.postgres import SessionLocal
from src.models import Project

fake = Faker()


def insert_initial_data(db: Session):
    projects = []
    for _ in range(15):
        project = Project(
            name=fake.company(),
            project_type=random.choice(["solar", "wind", "hydroelectric"]),
            latitude=random.uniform(-30.0, -35.0),
            longitude=random.uniform(-68.0, -60.0),
        )
        projects.append(project)

    db.bulk_save_objects(projects)
    db.commit()