from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.create_swap_request import (
    CreateSwapRequestPayload,
    CreateSwapResponse,
)


def add_swap_request(payload: CreateSwapRequestPayload, db: Session) -> CreateSwapResponse:

    requester_assignment_stmt = (
        select(ScheduleAssignment)
        .where(ScheduleAssignment.id == int(payload.requesterAssignmentId))
        .options(joinedload(ScheduleAssignment.employee))
    )
    requester_assignment = db.scalars(requester_assignment_stmt).unique().one()

    cover_assignment_stmt = (
        select(ScheduleAssignment)
        .where(ScheduleAssignment.id == int(payload.coverAssignmentId))
        .options(joinedload(ScheduleAssignment.employee))
    )
    coverAssignment = db.scalars(cover_assignment_stmt).unique().one()

    new_swap_request = SwapRequest(
        employee_status=EmployeeRequestStatus.pending,
        manager_status=ManagerRequestStatus.not_sent,
        requester_id=requester_assignment.employee_id,
        cover_id=coverAssignment.employee_id,
        requester_assignment_id=requester_assignment.id,
        cover_assignment_id=coverAssignment.id,
    )

    db.add(new_swap_request)
    db.commit()
    db.refresh(new_swap_request)

    return CreateSwapResponse(success=True)
