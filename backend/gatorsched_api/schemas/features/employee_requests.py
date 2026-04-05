from datetime import date
from typing import Literal

from pydantic import BaseModel

from ...models.swap_request import SwapRequestStatus


class RequestPerson(BaseModel):
    id: str
    name: str
    avatarUrl: str | None = None
    color: str | None = None


class RequestShiftSummary(BaseModel):
    day: date
    timeRange: str


class EmployeeRequestCardBase(BaseModel):
    id: str
    status: SwapRequestStatus


class EmployeeSwapRequestCard(EmployeeRequestCardBase):
    type: Literal["swap"] = "swap"
    requester: RequestPerson
    requesterShift: RequestShiftSummary
    coverEmployee: RequestPerson
    coverShift: RequestShiftSummary


# Placeholder alias until additional employee request card types are introduced
EmployeeRequestCard = EmployeeSwapRequestCard


class EmployeeRequestsResponse(BaseModel):
    incoming: list[EmployeeRequestCard]
    outgoing: list[EmployeeRequestCard]
