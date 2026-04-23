from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.employee.availability.employee_availability import (
    EmployeeAvailability,
    ShiftTimeSpan,
)
from gatorsched_api.services.datetime_formatting import format_time_range

SUNDAY_FIRST_DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
SUNDAY_FIRST_DAY_NAME = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]


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
            key=SUNDAY_FIRST_DAY_ABBR[day_of_week],
            shortLabel=SUNDAY_FIRST_DAY_ABBR[day_of_week][:2],
            longLabel=SUNDAY_FIRST_DAY_NAME[day_of_week],
            timeRange="Unavailable",
            timeWindow=time_window,
            isAvailable=False,
        )

    time_window = ShiftTimeSpan(
        startHour=availability.start_time.strftime("%I"),
        startMinute=availability.start_time.strftime("%M"),
        startTimePeriod=availability.start_time.strftime("%p"),
        endHour=availability.end_time.strftime("%I"),
        endMinute=availability.end_time.strftime("%M"),
        endTimePeriod=availability.end_time.strftime("%p"),
    )

    return EmployeeAvailability(
        key=SUNDAY_FIRST_DAY_ABBR[availability.day_of_week],
        shortLabel=SUNDAY_FIRST_DAY_ABBR[availability.day_of_week][:2],
        longLabel=SUNDAY_FIRST_DAY_NAME[availability.day_of_week],
        timeRange=format_time_range(availability.start_time, availability.end_time),
        timeWindow=time_window,
        isAvailable=True,
    )
