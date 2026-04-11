from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.availability.employee_availability import (
    EmployeeAvailabilityResponse,
)
from gatorsched_api.services.availability.employee_availability import get_employee_availabilities

router = APIRouter(tags=["employee_availabilities"])


@router.get("/employee/availabilities", response_model=EmployeeAvailabilityResponse)
def get_all_employee_availabilities(
    viewer_id: int, db: Session = Depends(get_db)
) -> EmployeeAvailabilityResponse:
    return get_employee_availabilities(db, viewer_id)
