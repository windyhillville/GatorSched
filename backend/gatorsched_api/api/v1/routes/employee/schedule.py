from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.features.employee_schedule import EmployeeScheduleResponse
from gatorsched_api.services.schedule.employee_schedule import get_employee_schedule

router = APIRouter(tags=["employee_schedule"])

@router.get("/employee/schedule", response_model=EmployeeScheduleResponse)
def get_schedule(viewer_id: int, week_start: date | None = None, db: Session = Depends(get_db),) -> EmployeeScheduleResponse:
    return get_employee_schedule(db, viewer_id, week_start)
