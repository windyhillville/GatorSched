from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.schedule_assignment import AssignmentStatus, ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.manager.shifts.manage_assignment import (
    ManageAssignmentRequest,
    ManageAssignmentResponse,
)


def edit_assignment(
    shift_id: str, payload: ManageAssignmentRequest, db: Session
) -> ManageAssignmentResponse:

    shiftStmt = (
        select(Shift).where(Shift.id == int(shift_id)).options(joinedload(Shift.assignments))
    )

    shift = db.scalars(shiftStmt).unique().one()

    current_ids = {str(assignment.employee_id) for assignment in shift.assignments}
    new_ids = set(payload.employeeIds)

    ids_to_remove = current_ids - new_ids
    ids_to_add = new_ids - current_ids

    assignments_to_remove = [
        assignment
        for assignment in shift.assignments
        if str(assignment.employee_id) in ids_to_remove
    ]

    for assignment in assignments_to_remove:
        db.delete(assignment)

    for employee_id in ids_to_add:
        shift.assignments.append(
            ScheduleAssignment(
                employee_id=int(employee_id), shift_id=shift.id, status=AssignmentStatus.assigned
            )
        )

    db.commit()
    db.refresh(shift)

    return ManageAssignmentResponse(success=True)
