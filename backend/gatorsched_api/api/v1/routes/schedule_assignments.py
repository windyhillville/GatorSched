from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.schemas.schedule_assignment import ScheduleAssignmentRead

router = APIRouter(tags=["schedule_assignments"])

@router.get("/schedule_assignments", response_model=list[ScheduleAssignmentRead])
def list_schedule_assignments(db: Session = Depends(get_db)) -> list[ScheduleAssignmentRead]:
    schedule_assignments = db.query(ScheduleAssignment)
    return schedule_assignments.all()