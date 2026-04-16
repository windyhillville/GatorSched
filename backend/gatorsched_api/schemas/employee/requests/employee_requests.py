from typing import Literal

from pydantic import BaseModel

from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus

RequestType = Literal["swap", "callout", "pickup"]


class RequestPerson(BaseModel):
    id: str
    name: str
    avatarUrl: str | None = None
    color: str


class RequestShiftSummary(BaseModel):
    dayLabel: str
    timeRange: str


class EmployeeRequestCardBase(BaseModel):
    id: str
    employeeStatus: EmployeeRequestStatus
    managerStatus: ManagerRequestStatus


class EmployeeSwapRequestCard(EmployeeRequestCardBase):
    type: RequestType = "swap"
    requester: RequestPerson
    requesterShift: RequestShiftSummary
    coverEmployee: RequestPerson
    coverShift: RequestShiftSummary


# Placeholder alias until additional employee request card types are introduced
EmployeeRequestCard = EmployeeSwapRequestCard


class EmployeeRequestsResponse(BaseModel):
    incoming: list[EmployeeRequestCard]
    outgoing: list[EmployeeRequestCard]
