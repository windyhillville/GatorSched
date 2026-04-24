from typing import Literal

from pydantic import BaseModel


class RoleInfo(BaseModel):
    id: str
    name: str
    color: str


class AssignmentInfo(BaseModel):
    assignmentId: str | None = None
    employeeId: str
    employeeName: str
    avatarUrl: str | None = None
    color: str


class TimeRange(BaseModel):
    minute: str
    hour: str
    period: Literal["AM", "PM"]


class ShiftItem(BaseModel):
    id: str
    role: RoleInfo
    # roleId: str
    # roleName: str
    # roleColor: str
    fromTime: str
    toTime: str
    dayKey: str
    shortDayLabel: str
    longDayLabel: str
    startTime: TimeRange
    endTime: TimeRange
    staffingRequirement: int
    assignedEmployees: list[AssignmentInfo]
    availableEmployees: list[AssignmentInfo]
    underStaffedAmount: int


class ShiftsGroup(BaseModel):
    role: str
    shifts: list[ShiftItem]


class ShiftsResponse(BaseModel):
    weekLabel: str
    groups: list[ShiftsGroup]
    roles: list[RoleInfo]
