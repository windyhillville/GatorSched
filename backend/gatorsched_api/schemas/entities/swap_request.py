from pydantic import BaseModel, ConfigDict

from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus


class SwapRequestBase(BaseModel):
    employee_status: EmployeeRequestStatus = EmployeeRequestStatus.pending
    manager_status: ManagerRequestStatus = ManagerRequestStatus.not_sent
    requester_id: int
    cover_id: int
    requester_assignment_id: int
    cover_assignment_id: int


class SwapRequestCreate(SwapRequestBase):
    pass


class SwapRequestRead(SwapRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
