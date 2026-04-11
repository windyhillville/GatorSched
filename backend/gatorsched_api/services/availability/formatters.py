import calendar

from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.features.availability.employee_availability import (
    EmployeeAvailability,
    ShiftTimeSpan,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_range,
)


def build_employee_availability(
    day_of_week: int, availability: Availability | None
) -> EmployeeAvailability:

    if availability is None:
        time_window = ShiftTimeSpan(
            startHour="01",
            startMinute="00",
            startTimePeriod="AM",
            endHour="01",
            endMinute="00",
            endTimePeriod="AM",
        )

        return EmployeeAvailability(
            key=calendar.day_abbr[day_of_week],
            shortLabel=calendar.day_abbr[day_of_week][:2],
            longLabel=calendar.day_name[day_of_week],
            timeRange="Unavailable",
            timeWindow=time_window,
            isAvailable=False,
        )

    else:
        time_window = ShiftTimeSpan(
            startHour=availability.start_time.strftime("%I"),
            startMinute=availability.start_time.strftime("%M"),
            startTimePeriod=availability.start_time.strftime("%p"),
            endHour=availability.end_time.strftime("%I"),
            endMinute=availability.end_time.strftime("%M"),
            endTimePeriod=availability.end_time.strftime("%p"),
        )

        return EmployeeAvailability(
            key=calendar.day_abbr[availability.day_of_week],
            shortLabel=calendar.day_abbr[availability.day_of_week][:2],
            longLabel=calendar.day_name[availability.day_of_week],
            timeRange=format_time_range(availability.start_time, availability.end_time),
            timeWindow=time_window,
            isAvailable=True,
        )
