from datetime import date

from pydantic import BaseModel


class GenerateScheduleRequest(BaseModel):
    week_start: date


class ScheduledShift(BaseModel):
    id: str
    employeeName: str
    startLabel: str
    endLabel: str
    color: str


class RoleGroup(BaseModel):
    role: str
    shifts: list[ScheduledShift]


class DaySchedule(BaseModel):
    date: date
    dayLabel: str
    groups: list[RoleGroup]


class GenerateScheduleResponse(BaseModel):
    days: list[DaySchedule]
