from pydantic import BaseModel

from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.employee_requests import (
    RequestPerson,
    RequestShiftSummary,
    RequestType,
)


class ManagerRequestCardBase(BaseModel):
    id: str
    employee_status: EmployeeRequestStatus
    manager_status: ManagerRequestStatus


class ManagerSwapRequestCard(ManagerRequestCardBase):
    type: RequestType = "swap"

    requester: RequestPerson
    coverEmployee: RequestPerson

    requesterShift: RequestShiftSummary
    coverShift: RequestShiftSummary

    impactSummary: str | None = None


ManagerRequestCard = ManagerSwapRequestCard


class ManagerRequestCardGroup(BaseModel):
    role: str
    requests: list[ManagerRequestCard]


class ManagerRequestCardResponse(BaseModel):
    groups: list[ManagerRequestCardGroup]
