from pydantic import BaseModel, ConfigDict

from ...models.pickup_request import PickUpRequestStatus


class PickUpRequestBase(BaseModel):
    status: PickUpRequestStatus = PickUpRequestStatus.pending
    employee_id: int
    shift_id: int


class PickUpRequestCreate(PickUpRequestBase):
    pass


class PickUpRequestRead(PickUpRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
