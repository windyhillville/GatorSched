from pydantic import BaseModel


class EmployeeShiftSummary(BaseModel):
    fromTime: str
    toTime: str
    longLabel: str
    dateLabel: str
    shiftHours: float


class EmployeeShift(BaseModel):
    key: str
    shortLabel: str
    timeRange: str
    isoDate: str
    summary: EmployeeShiftSummary


class EmployeeScheduleResponse(BaseModel):
    id: str
    color: str
    weekLabel: str
    totalHours: float
    schedule: list[EmployeeShift]
