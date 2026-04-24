from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.employee.schedule.employee_schedule import (
    EmployeeScheduleResponse,
    EmployeeShift,
    EmployeeShiftSummary,
)
from gatorsched_api.services.datetime_formatting import (
    format_short_date,
    format_time_label,
    format_time_range,
    format_week_label,
    get_day_key,
    get_long_day_label,
    get_shift_duration_hours,
    get_short_day_label,
    get_sunday_week_bounds,
)


def get_employee_schedule(
    db: Session, viewer_id: int, week_start: date | None = None
) -> EmployeeScheduleResponse:
    employee = db.scalars(select(Employee).where(Employee.id == viewer_id)).one()

    reference_date = week_start or date.today()
    start_of_week, end_of_week = get_sunday_week_bounds(reference_date)

    stmt = (
        select(ScheduleAssignment)
        .join(ScheduleAssignment.shift)
        .where(
            ScheduleAssignment.employee_id == viewer_id,
            Shift.date >= start_of_week,
            Shift.date <= end_of_week,
        )
        .options(joinedload(ScheduleAssignment.shift))
        .order_by(Shift.date, Shift.start_time)
    )
    assignments = db.scalars(stmt).all()

    schedule: list[EmployeeShift] = []
    total_hours = 0

    for assignment in assignments:
        hours = get_shift_duration_hours(assignment.shift.start_time, assignment.shift.end_time)
        total_hours += hours
        summary = EmployeeShiftSummary(
            fromTime=format_time_label(assignment.shift.start_time),
            toTime=format_time_label(assignment.shift.end_time),
            longLabel=get_long_day_label(assignment.shift.date),
            dateLabel=format_short_date(assignment.shift.date),
            shiftHours=hours,
        )

        schedule.append(
            EmployeeShift(
                key=get_day_key(assignment.shift.date),
                shortLabel=get_short_day_label(assignment.shift.date),
                timeRange=format_time_range(assignment.shift.start_time, assignment.shift.end_time),
                isoDate=assignment.shift.date.isoformat(),
                summary=summary,
            )
        )

    return EmployeeScheduleResponse(
        id=str(employee.id),
        color=employee.color,
        weekLabel=format_week_label(start_of_week, end_of_week),
        totalHours=total_hours,
        schedule=schedule,
    )
