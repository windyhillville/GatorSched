from pydantic import BaseModel, ConfigDict

from ...models.swap_request import SwapRequestStatus


class SwapRequestBase(BaseModel):
    status: SwapRequestStatus = SwapRequestStatus.pending
    requester_id: int
    cover_id: int
    requester_assignment_id: int
    cover_assignment_id: int


class SwapRequestCreate(SwapRequestBase):
    pass


class SwapRequestRead(SwapRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
