from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.employee.requests.employee_requests import (
    RequestPerson,
)
from gatorsched_api.schemas.employee.requests.render_swap_request_info import (
    AssignmentSummary,
    EmployeeSwapRequestInfoResponse,
    TeammateShiftGroup,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
    get_short_day_label,
    get_sunday_week_bounds,
)


def get_swap_request_info(
    viewer_id: int, week_start: date, db: Session
) -> EmployeeSwapRequestInfoResponse:

    start_week, end_week = get_sunday_week_bounds(week_start)

    requesterStmt = (
        select(Employee)
        .where(Employee.id == viewer_id)
        .join(Employee.assignments)
        .join(ScheduleAssignment.shift)
        .where(Shift.date.between(start_week, end_week))
        .options(
            selectinload(Employee.assignments)
            .joinedload(ScheduleAssignment.shift)
            .joinedload(Shift.role)
        )
    )
    requester = db.scalars(requesterStmt).unique().one()

    teammatesStmt = (
        select(Employee)
        .where(Employee.role_id == requester.role_id, Employee.id != requester.id)
        .join(Employee.assignments)
        .join(ScheduleAssignment.shift)
        .where(Shift.date.between(start_week, end_week))
        .options(
            selectinload(Employee.assignments)
            .joinedload(ScheduleAssignment.shift)
            .joinedload(Shift.role)
        )
    )
    teammates = db.scalars(teammatesStmt).unique().all()

    requester_week_assignments = [
        assignment
        for assignment in requester.assignments
        if start_week <= assignment.shift.date <= end_week
    ]

    teammate_week_assignments = {
        teammate.id: [
            assignment
            for assignment in teammate.assignments
            if start_week <= assignment.shift.date <= end_week
        ]
        for teammate in teammates
    }

    requesterEmployee: RequestPerson
    requesterShifts: list[AssignmentSummary] = []
    for req_assignment in requester_week_assignments:
        requesterEmployee = RequestPerson(
            id=str(req_assignment.employee_id),
            name=req_assignment.employee.name,
            avatarUrl=req_assignment.employee.avatar_url,
            color=req_assignment.employee.color,
        )
        requesterShifts.append(
            AssignmentSummary(
                assignmentId=str(req_assignment.id),
                dayLabel=get_short_day_label(req_assignment.shift.date),
                monthAndDayLabel=f"{req_assignment.shift.date.strftime('%B')} {req_assignment.shift.date.day}",
                timeRange=format_time_range(
                    req_assignment.shift.start_time, req_assignment.shift.end_time
                ),
            )
        )

    eligibleTeammates: list[RequestPerson] = []
    eligibleTeammatesShifts: list[TeammateShiftGroup] = []

    for teammate in teammates:
        eligibleTeammates.append(
            RequestPerson(
                id=str(teammate.id),
                name=teammate.name,
                avatarUrl=teammate.avatar_url,
                color=teammate.color,
            )
        )

        teammate_shifts = [
            AssignmentSummary(
                assignmentId=str(assignment.id),
                dayLabel=get_short_day_label(assignment.shift.date),
                monthAndDayLabel=f"{assignment.shift.date.strftime('%B')} {assignment.shift.date.day}",
                timeRange=format_time_range(
                    assignment.shift.start_time,
                    assignment.shift.end_time,
                ),
            )
            for assignment in teammate_week_assignments[teammate.id]
        ]

        eligibleTeammatesShifts.append(
            TeammateShiftGroup(
                teammateId=str(teammate.id),
                shifts=teammate_shifts,
            )
        )

    return EmployeeSwapRequestInfoResponse(
        requester=requesterEmployee,
        requesterShifts=requesterShifts,
        eligibleTeammates=eligibleTeammates,
        eligibleTeammatesShifts=eligibleTeammatesShifts,
    )
