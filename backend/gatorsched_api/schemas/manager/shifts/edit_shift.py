from datetime import date

from pydantic import BaseModel

from gatorsched_api.schemas.manager.shifts.shared_types import EditedShift, TimeRange


class EditShiftRequest(BaseModel):
    date: date
    startTime: TimeRange
    endTime: TimeRange
    staffingRequirement: int
    roleId: str


# class EditedShift(BaseModel):
#     id: str
#     date: date
#     dayKey: str
#     shortDayLabel: str
#     longDayLabel: str
#     startTime: TimeRange
#     endTime: TimeRange
#     staffingRequirement: int
#     roleId: str
#     roleName: str
#     roleColor: str
#     fromTime: str
#     toTime: str


class EditShiftResponse(BaseModel):
    shift: EditedShift
