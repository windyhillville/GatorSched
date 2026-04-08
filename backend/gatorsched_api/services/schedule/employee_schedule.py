from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.features.employee_schedule import (
    DayItem,
    DaySummary,
    EmployeeScheduleResponse,
)

from gatorsched_api.services.time_formatting import (
    format_time_label,
    format_time_range,
    format_week_label,
    get_shift_duration_hours,
    get_sunday_week_bounds,
)

DAY_KEYS = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"]
DAY_SHORT_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
DAY_LONG_LABELS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

def _day_index(d:date) -> int:
    # Converts Python weekday to Sunday first index
    return (d.weekday() + 1) % 7

def get_employee_schedule(db: Session, viewer_id: int, week_start: date | None = None) -> EmployeeScheduleResponse:
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
    )
    assignments = db.scalars(stmt).all()

    by_day: dict[int, ScheduleAssignment] = {
        _day_index(a.shift.date): a for a in assignments
    }

    schedule: list[DayItem] = []
    total_hours = 0

    for i in range(7):
        assignment = by_day.get(i)
        if assignment is not None:
            shift = assignment.shift
            hours = get_shift_duration_hours(shift.start_time, shift.end_time)
            total_hours += hours
            summary = DaySummary(
                fromTime=format_time_label(shift.start_time),
                toTime=format_time_label(shift.end_time),
                longLabel=DAY_LONG_LABELS[i],
                shiftHours=hours,
            )
            time_range = format_time_range(shift.start_time, shift.end_time)
        else:
            summary = DaySummary(
                fromTime="",
                toTime="",
                longLabel=DAY_LONG_LABELS[i],
                shiftHours=0,
            )
            time_range = "Off"
        schedule.append(DayItem(
            key=DAY_KEYS[i],
            shortLabel=DAY_SHORT_LABELS[i],
            timeRange=time_range,
            summary=summary,
        ))

    return EmployeeScheduleResponse(
        id=str(employee.id),
        color="", # Need to figure out what color we want to do for this or make it based on a static list.
        weekLabel=format_week_label(start_of_week, end_of_week),
        totalHours=total_hours,
        schedule=schedule,
    )


