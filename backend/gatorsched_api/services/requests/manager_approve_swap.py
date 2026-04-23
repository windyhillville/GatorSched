from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse


def approve_swap(request_id: int, db: Session) -> RequestDecisionResponse:
    swap_request_stmt = select(SwapRequest).where(SwapRequest.id == request_id)
    swap_request = db.scalars(swap_request_stmt).unique().one()

    requester_assignment_stmt = select(ScheduleAssignment).where(
        ScheduleAssignment.id == swap_request.requester_assignment_id,
    )
    requester_assignment = db.scalars(requester_assignment_stmt).unique().one()

    cover_assignment_stmt = select(ScheduleAssignment).where(
        ScheduleAssignment.id == swap_request.cover_assignment_id,
    )
    cover_assignment = db.scalars(cover_assignment_stmt).unique().one()

    swap_request.employee_status = EmployeeRequestStatus.accepted
    swap_request.manager_status = ManagerRequestStatus.approved

    requester_assignment.employee_id = swap_request.cover_id
    cover_assignment.employee_id = swap_request.requester_id

    db.commit()
    db.refresh(swap_request)

    return RequestDecisionResponse(success=True)
