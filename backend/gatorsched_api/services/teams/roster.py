from collections import defaultdict
from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.features.teams import (
    TeamGroup,
    TeamMemberCard,
    TeamMemberSchedule,
    TeamsResponse,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
    get_shift_duration_hours,
    get_sunday_week_bounds,
)


def get_roster(db: Session, target_date: date) -> TeamsResponse:
    ## NOTE: changed from get_week_bounds() -> get_sunday_week_bounds()
    start_of_week, end_of_week = get_sunday_week_bounds(target_date)

    employee_stmt = (
        select(Employee)
        .where(Employee.is_active)
        .options(joinedload(Employee.role))
        .order_by(Employee.name)
    )
    employees = db.scalars(employee_stmt).unique().all()

    if not employees:
        return TeamsResponse(groups=[])

    employee_ids = [e.id for e in employees]

    assignment_stmt = (
        select(ScheduleAssignment)
        .where(ScheduleAssignment.employee_id.in_(employee_ids))
        .join(ScheduleAssignment.shift)
        .options(joinedload(ScheduleAssignment.shift))
        .where(Shift.date.between(start_of_week, end_of_week))
        .order_by(Shift.date, Shift.start_time)
    )

    weekly_assignments = db.scalars(assignment_stmt).unique().all()

    schedules_by_employee: dict[int, list[TeamMemberSchedule]] = defaultdict(list)
    total_hours_by_employees: dict[int, float] = defaultdict(float)
    for assignment in weekly_assignments:
        schedules_by_employee[assignment.employee_id].append(
            TeamMemberSchedule(
                id=str(assignment.id),
                day=assignment.shift.date,
                timeRange=format_time_range(assignment.shift.start_time, assignment.shift.end_time),
            )
        )

        total_hours_by_employees[assignment.employee_id] += get_shift_duration_hours(
            assignment.shift.start_time, assignment.shift.end_time
        )

    groups_by_role: dict[str, list[TeamMemberCard]] = defaultdict(list)
    for employee in employees:
        groups_by_role[employee.role.name].append(
            TeamMemberCard(
                id=str(employee.id),
                name=employee.name,
                role=employee.role.name,
                color=employee.color,
                avatarUrl=employee.avatar_url,
                totalHours=total_hours_by_employees[employee.id],
                schedule=schedules_by_employee[employee.id],
            )
        )

    groups = [TeamGroup(role=role, members=members) for role, members in groups_by_role.items()]

    return TeamsResponse(groups=groups)
