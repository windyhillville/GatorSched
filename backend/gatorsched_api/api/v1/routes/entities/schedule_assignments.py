from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.schemas.entities.schedule_assignment import (
    ScheduleAssignmentCreate,
    ScheduleAssignmentRead,
)

router = APIRouter(tags=["schedule_assignments"])


@router.get("/schedule_assignments", response_model=list[ScheduleAssignmentRead])
def list_schedule_assignments(db: Session = Depends(get_db)) -> list[ScheduleAssignmentRead]:
    stmt = select(ScheduleAssignment).options(
        joinedload(ScheduleAssignment.employee), joinedload(ScheduleAssignment.shift)
    )
    return db.scalars(stmt).all()


# schedule_assignments = db.query(ScheduleAssignment)
# return schedule_assignments.all()


@router.post("/schedule_assignments", response_model=ScheduleAssignmentRead, status_code=201)
def create_assignment(
    assignment_in: ScheduleAssignmentCreate, db: Session = Depends(get_db)
) -> ScheduleAssignment:
    assignment = ScheduleAssignment(**assignment_in.model_dump())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment
