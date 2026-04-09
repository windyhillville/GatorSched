from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest, SwapRequestStatus
from gatorsched_api.schemas.features.employee_requests import (
    EmployeeRequestsResponse,
    EmployeeSwapRequestCard,
    RequestPerson,
    RequestShiftSummary,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
)


def get_employee_requests(db: Session, viewer_id: int) -> EmployeeRequestsResponse:
    swap_request_stmt = (
        select(SwapRequest)
        .where(
            and_(
                SwapRequest.status == SwapRequestStatus.pending,
                or_(SwapRequest.requester_id == viewer_id, SwapRequest.cover_id == viewer_id),
            )
        )
        .options(
            joinedload(SwapRequest.requester),
            joinedload(SwapRequest.cover_employee),
            joinedload(SwapRequest.requester_assignment).joinedload(ScheduleAssignment.shift),
            joinedload(SwapRequest.cover_assignment).joinedload(ScheduleAssignment.shift),
        )
        .order_by(SwapRequest.id.desc())
    )

    swap_requests = db.scalars(swap_request_stmt).unique().all()

    incoming: list[EmployeeSwapRequestCard] = []
    outgoing: list[EmployeeSwapRequestCard] = []

    for swap in swap_requests:
        card = EmployeeSwapRequestCard(
            id=str(swap.id),
            status=swap.status,
            requester=RequestPerson(
                id=str(swap.requester_id),
                name=swap.requester.name,
                avatarUrl=swap.requester.avatar_url,
                color=swap.requester.color,
            ),
            requesterShift=RequestShiftSummary(
                day=swap.requester_assignment.shift.date,
                timeRange=format_time_range(
                    swap.requester_assignment.shift.start_time,
                    swap.requester_assignment.shift.end_time,
                ),
            ),
            coverEmployee=RequestPerson(
                id=str(swap.cover_employee.id),
                name=swap.cover_employee.name,
                avatarUrl=swap.cover_employee.avatar_url,
                color=swap.cover_employee.color,
            ),
            coverShift=RequestShiftSummary(
                day=swap.cover_assignment.shift.date,
                timeRange=format_time_range(
                    swap.cover_assignment.shift.start_time, swap.cover_assignment.shift.end_time
                ),
            ),
        )

        if viewer_id == swap.requester_id:
            outgoing.append(card)

        if viewer_id == swap.cover_id:
            incoming.append(card)

    return EmployeeRequestsResponse(incoming=incoming, outgoing=outgoing)
