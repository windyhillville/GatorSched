import calendar

from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.features.employee_availability import (
    EmployeeAvailability,
    EmployeeAvailabilityResponse,
    ShiftTimeSpan,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
)


def get_employee_availabilities(db: Session, viewer_id: int) -> EmployeeAvailabilityResponse:
    availability_stmt = (
        select(Availability).where(Availability.employee_id == viewer_id)
        # .order_by((Availability.day_of_week + 1) % 7, Availability.start_time)
    )
    availabilities = db.scalars(availability_stmt).unique().all()
    avail_map = {a.day_of_week: a for a in availabilities}

    employee_availabilities: list[EmployeeAvailability] = []

    sunday_first_order = [6, 0, 1, 2, 3, 4, 5]
    for day_idx in sunday_first_order:
        day = avail_map.get(day_idx)

        if not day:
            time_window = ShiftTimeSpan(
                startHour="01",
                startMinute="00",
                startTimePeriod="AM",
                endHour="01",
                endMinute="00",
                endTimePeriod="AM",
            )
            employee_availability = EmployeeAvailability(
                key=calendar.day_abbr[day_idx],
                shortLabel=calendar.day_abbr[day_idx][:2],
                longLabel=calendar.day_name[day_idx],
                timeRange="Unavailable",
                timeWindow=time_window,
            )
        else:
            time_window = ShiftTimeSpan(
                startHour=day.start_time.strftime("%I"),
                startMinute=day.start_time.strftime("%M"),
                startTimePeriod=day.start_time.strftime("%p"),
                endHour=day.end_time.strftime("%I"),
                endMinute=day.end_time.strftime("%M"),
                endTimePeriod=day.end_time.strftime("%p"),
            )

            employee_availability = EmployeeAvailability(
                key=calendar.day_abbr[day.day_of_week],
                shortLabel=calendar.day_abbr[day.day_of_week][:2],
                longLabel=calendar.day_name[day.day_of_week],
                timeRange=format_time_range(day.start_time, day.end_time),
                timeWindow=time_window,
            )

        employee_availabilities.append(employee_availability)

    return EmployeeAvailabilityResponse(id=str(viewer_id), availabilities=employee_availabilities)
