from pydantic import BaseModel, ConfigDict


class SwapRequestBase(BaseModel):
    status: str = "pending"


class SwapRequestCreate(SwapRequestBase):
    pass


class SwapRequestRead(SwapRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int