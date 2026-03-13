from datetime import date

from pydantic import BaseModel


class GenerateScheduleRequest(BaseModel):
    date: date


class ScheduledShift(BaseModel):
    id: str
    employeeName: str
    startLabel: str
    endLabel: str
    color: str


class RoleGroup(BaseModel):
    role: str
    shifts: list[ScheduledShift]


class GenerateScheduleResponse(BaseModel):
    groups: list[RoleGroup]
