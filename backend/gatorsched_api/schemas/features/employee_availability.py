from typing import Literal

from pydantic import BaseModel


class ShiftTimeSpan(BaseModel):
    startHour: str
    startMinute: str
    startTimePeriod: Literal["AM", "PM"]
    endHour: str
    endMinute: str
    endTimePeriod: Literal["AM", "PM"]


class EmployeeAvailability(BaseModel):
    key: str
    shortLabel: str
    longLabel: str
    timeRange: str
    timeWindow: ShiftTimeSpan


class EmployeeAvailabilityResponse(BaseModel):
    id: str
    availabilities: list[EmployeeAvailability]
