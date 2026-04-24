from datetime import date

from pydantic import BaseModel

from gatorsched_api.schemas.manager.shifts.shared_types import EditedShift, TimeRange


class CreateShiftRequest(BaseModel):
    date: date
    startTime: TimeRange
    endTime: TimeRange
    staffingRequirement: int
    roleId: str


class CreateShiftResponse(BaseModel):
    shift: EditedShift
