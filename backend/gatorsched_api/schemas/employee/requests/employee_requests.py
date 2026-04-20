from typing import Annotated, Literal

from pydantic import BaseModel, Field

from gatorsched_api.models.callout_request import CallOutStatus
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
    type: Literal["swap"] = "swap"
    requester: RequestPerson
    requesterShift: RequestShiftSummary
    coverEmployee: RequestPerson
    coverShift: RequestShiftSummary

class EmployeeCalloutRequestCard(EmployeeRequestCardBase):
    type: Literal["callout"] = "callout"
    employee: RequestPerson
    shift: RequestShiftSummary
    reason: str | None = None
    status: CallOutStatus

# Placeholder alias until additional employee request card types are introduced
EmployeeRequestCard = Annotated[
    EmployeeSwapRequestCard | EmployeeCalloutRequestCard,
    Field(discriminator="type"),
]


class EmployeeRequestsResponse(BaseModel):
    incoming: list[EmployeeRequestCard]
    outgoing: list[EmployeeRequestCard]
