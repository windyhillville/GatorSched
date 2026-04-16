from collections import defaultdict
from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.manager.scheduler.scheduler import (
    DaySchedule,
    GenerateScheduleResponse,
    RoleGroup,
    ScheduledShift,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_label,
    get_long_day_label,
    get_sunday_week_bounds,
)


def get_scheduled_data(week_start: date, db: Session) -> GenerateScheduleResponse:

    start_week, end_week = get_sunday_week_bounds(week_start)

    schedule_assignment_stmt = (
        select(ScheduleAssignment)
        .join(ScheduleAssignment.shift)
        .options(
            joinedload(ScheduleAssignment.shift).joinedload(Shift.role),
            joinedload(ScheduleAssignment.employee),
        )
        .where(Shift.date.between(start_week, end_week))
        .order_by(Shift.date, Shift.start_time)
    )

    schedule_assignments = db.scalars(schedule_assignment_stmt).unique().all()

    days_by_date: dict[date, dict[str, list[ScheduledShift]]] = defaultdict(
        lambda: defaultdict(list)
    )
    for assignment in schedule_assignments:
        shift_date = assignment.shift.date
        role_name = assignment.shift.role.name

        days_by_date[shift_date][role_name].append(
            ScheduledShift(
                employeeId=str(assignment.employee.id),
                employeeName=assignment.employee.name,
                startLabel=format_time_label(assignment.shift.start_time),
                endLabel=format_time_label(assignment.shift.end_time),
                color=assignment.employee.color,
            )
        )

    all_week_dates = [start_week + timedelta(days=i) for i in range(7)]

    days = [
        DaySchedule(
            date=d,
            dayLabel=get_long_day_label(d),
            groups=[
                RoleGroup(role=role_name, shifts=shifts)
                for role_name, shifts in days_by_date.get(d, {}).items()
            ],
        )
        for d in all_week_dates
    ]

    return GenerateScheduleResponse(days=days)
