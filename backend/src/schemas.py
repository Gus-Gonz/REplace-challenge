from pydantic import BaseModel
from decimal import Decimal

class Project(BaseModel):
    id: int
    name: str
    project_type: str
    latitude: Decimal
    longitude: Decimal
