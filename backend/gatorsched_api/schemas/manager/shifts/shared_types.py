from datetime import date
from typing import Literal

from pydantic import BaseModel


class TimeRange(BaseModel):
    minute: str
    hour: str
    period: Literal["AM", "PM"]


class EditedShift(BaseModel):
    id: str
    date: date
    dayKey: str
    shortDayLabel: str
    longDayLabel: str
    startTime: TimeRange
    endTime: TimeRange
    staffingRequirement: int
    roleId: str
    roleName: str
    roleColor: str
    fromTime: str
    toTime: str
