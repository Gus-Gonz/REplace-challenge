
from fastapi import APIRouter, Depends, Query
from typing import List, Optional

from src import schemas

router = APIRouter()

MOCK_PROJECTS = [
    {
        "id": 10,
        "name": "Hall, Lester and Price",
        "project_type": "hydroelectric",
        "latitude": "-34.441619",
        "longitude": "-66.643071"
    },
    {
        "id": 9,
        "name": "Mcdowell-Moran",
        "project_type": "hydroelectric",
        "latitude": "-33.360432",
        "longitude": "-60.884914"
    },
    {
        "id": 8,
        "name": "Willis PLC",
        "project_type": "solar",
        "latitude": "-30.331709",
        "longitude": "-67.086798"
    },
    {
        "id": 7,
        "name": "Arias LLC",
        "project_type": "hydroelectric",
        "latitude": "-30.645811",
        "longitude": "-62.892213"
    },
    {
        "id": 6,
        "name": "Yang, Newman and Rice",
        "project_type": "solar",
        "latitude": "-33.165837",
        "longitude": "-63.040696"
    },
    {
        "id": 5,
        "name": "Davis PLC",
        "project_type": "solar",
        "latitude": "-32.081564",
        "longitude": "-63.115662"
    },
    {
        "id": 4,
        "name": "Reynolds, Hicks and Martin",
        "project_type": "wind",
        "latitude": "-34.308630",
        "longitude": "-66.062152"
    },
    {
        "id": 3,
        "name": "Lewis, Diaz and Stewart",
        "project_type": "hydroelectric",
        "latitude": "-31.739558",
        "longitude": "-63.971285"
    },
    {
        "id": 2,
        "name": "Coleman LLC",
        "project_type": "solar",
        "latitude": "-33.188765",
        "longitude": "-67.458101"
    },
    {
        "id": 1,
        "name": "Wright Ltd",
        "project_type": "solar",
        "latitude": "-32.276938",
        "longitude": "-60.233050"
    }
]


def get_mock_projects(project_types=None):
    """
    Filters the mock projects based on the specified types.

    Args:
        project_types (Optional[List[str]]): Project types to filter by.

    Returns:
        List: List of filtered projects.
    """
    if project_types:
        return [project for project in MOCK_PROJECTS if project.get("project_type") in project_types]

    return MOCK_PROJECTS


@router.get("/", response_model=List[schemas.Project])
def list_projects(
    project_type: Optional[List[str]] = Query(
        None,
        description="Filter projects by type(s). Multiple values can be provided.",
        enum=["solar", "wind", "hydroelectric"]
    )
):
    """
    Retrieve a list of projects from mock data.

    Args:
        project_type (Optional[List[str]]): Filter projects by type(s). Multiple values allowed.
    Returns:
        List[schemas.Project]: A list of project objects.
    """
    return get_mock_projects(project_types=project_type)
