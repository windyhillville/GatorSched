from collections import defaultdict

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.employee_requests import (
    RequestPerson,
    RequestShiftSummary,
)
from gatorsched_api.schemas.manager.requests.manager_requests import (
    ManagerRequestCardGroup,
    ManagerRequestCardResponse,
    ManagerSwapRequestCard,
)
from gatorsched_api.services.datetime_formatting import format_time_range, get_short_day_label


def get_manager_requests(db: Session) -> ManagerRequestCardResponse:
    swap_request_stmt = (
        select(SwapRequest)
        .where(
            SwapRequest.employee_status == EmployeeRequestStatus.accepted,
            SwapRequest.manager_status == ManagerRequestStatus.pending,
        )
        .options(
            joinedload(SwapRequest.requester).joinedload(Employee.role),
            joinedload(SwapRequest.cover_employee).joinedload(Employee.role),
            joinedload(SwapRequest.requester_assignment).joinedload(ScheduleAssignment.shift),
            joinedload(SwapRequest.cover_assignment).joinedload(ScheduleAssignment.shift),
        )
        .order_by(SwapRequest.id.desc())
    )

    swap_requests = db.scalars(swap_request_stmt).unique().all()

    group_by_role: dict[str, list[ManagerSwapRequestCard]] = defaultdict(list)

    for swap in swap_requests:
        card = ManagerSwapRequestCard(
            id=str(swap.id),
            employee_status=swap.employee_status,
            manager_status=swap.manager_status,
            requester=RequestPerson(
                id=str(swap.requester.id),
                name=swap.requester.name,
                avatarUrl=swap.requester.avatar_url,
                color=swap.requester.color,
            ),
            coverEmployee=RequestPerson(
                id=str(swap.cover_employee.id),
                name=swap.cover_employee.name,
                avatarUrl=swap.cover_employee.avatar_url,
                color=swap.cover_employee.color,
            ),
            requesterShift=RequestShiftSummary(
                dayLabel=get_short_day_label(swap.requester_assignment.shift.date),
                timeRange=format_time_range(
                    swap.requester_assignment.shift.start_time,
                    swap.requester_assignment.shift.end_time,
                ),
            ),
            coverShift=RequestShiftSummary(
                dayLabel=get_short_day_label(swap.cover_assignment.shift.date),
                timeRange=format_time_range(
                    swap.cover_assignment.shift.start_time, swap.cover_assignment.shift.end_time
                ),
            ),
        )

        group_by_role[swap.requester.role.name].append(card)

    groups = [
        ManagerRequestCardGroup(role=role, requests=requests)
        for role, requests in group_by_role.items()
    ]

    return ManagerRequestCardResponse(groups=groups)
