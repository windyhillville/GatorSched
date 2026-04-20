from sqlalchemy import and_, or_, select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.callout_request import CallOutRequest, CallOutStatus
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.employee_requests import (
    EmployeeRequestsResponse,
    EmployeeSwapRequestCard,
    EmployeeCalloutRequestCard,
    RequestPerson,
    RequestShiftSummary,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
    get_short_day_label,
)


def get_employee_requests(db: Session, viewer_id: int) -> EmployeeRequestsResponse:
    swap_request_stmt = (
        select(SwapRequest)
        .where(
            and_(
                or_(
                    SwapRequest.employee_status == EmployeeRequestStatus.pending,
                    SwapRequest.manager_status == ManagerRequestStatus.pending,
                ),
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
            employeeStatus=swap.employee_status,
            managerStatus=swap.manager_status,
            requester=RequestPerson(
                id=str(swap.requester_id),
                name=swap.requester.name,
                avatarUrl=swap.requester.avatar_url,
                color=swap.requester.color,
            ),
            requesterShift=RequestShiftSummary(
                dayLabel=get_short_day_label(swap.requester_assignment.shift.date),
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
                dayLabel=get_short_day_label(swap.cover_assignment.shift.date),
                timeRange=format_time_range(
                    swap.cover_assignment.shift.start_time, swap.cover_assignment.shift.end_time
                ),
            ),
        )

        if viewer_id == swap.requester_id:
            outgoing.append(card)

        if viewer_id == swap.cover_id:
            incoming.append(card)

    callout_stmt = (
        select(CallOutRequest)
        .where(
            and_(
                CallOutRequest.status == CallOutStatus.pending,
                CallOutRequest.employee_id == viewer_id,
            )
        )
        .options(
            joinedload(CallOutRequest.employee),
            joinedload(CallOutRequest.assignment).joinedload(ScheduleAssignment.shift),
        )
        .order_by(CallOutRequest.id.desc())
    )

    callouts = db.scalars(callout_stmt).unique().all()

    for callout in callouts:
        card = EmployeeCalloutRequestCard(
            id=str(callout.id),
            employeeStatus=EmployeeRequestStatus.pending,
            managerStatus=ManagerRequestStatus.pending,
            employee=RequestPerson(
                id=str(callout.employee_id),
                name=callout.employee.name,
                avatarUrl=callout.employee.avatar_url,
                color=callout.employee.color,
            ),
            shift=RequestShiftSummary(
                dayLabel=get_short_day_label(callout.assignment.shift.date),
                timeRange=format_time_range(
                    callout.assignment.shift.start_time, callout.assignment.shift.end_time,
                ),
            ),
            reason=callout.reason,
            status=callout.status,
        )

        outgoing.append(card)
    return EmployeeRequestsResponse(incoming=incoming, outgoing=outgoing)
