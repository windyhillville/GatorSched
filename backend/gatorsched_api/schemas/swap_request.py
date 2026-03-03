from pydantic import BaseModel, ConfigDict


class SwapRequestBase(BaseModel):
    status: str = "pending"
    requester_id: int
    cover_id: int | None = None
    schedule_assignment_id: int

class SwapRequestCreate(SwapRequestBase):
    pass


class SwapRequestRead(SwapRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int