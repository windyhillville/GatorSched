from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.availability.set_employee_availability import (
    SetEmployeeAvailabilityRequest,
    SetEmployeeAvailabilityResponse,
)
from gatorsched_api.services.availability.set_employee_availability import set_availability

router = APIRouter(tags=["set_availability"])


@router.put(
    "/employee/availabilities/{day_of_week}", response_model=SetEmployeeAvailabilityResponse
)
def set_employee_availability(
    day_of_week: int,
    payload: SetEmployeeAvailabilityRequest,
    viewer_id: int,
    db: Session = Depends(get_db),
) -> SetEmployeeAvailabilityResponse:
    return set_availability(day_of_week, payload, viewer_id, db)
