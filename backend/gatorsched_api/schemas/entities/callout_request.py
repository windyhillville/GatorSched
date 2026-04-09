from pydantic import BaseModel, ConfigDict

from ...models.callout_request import CallOutStatus


class CallOutRequestBase(BaseModel):
    status: CallOutStatus = CallOutStatus.pending
    employee_id: int
    assignment_id: int
    reason: str | None = None


class CallOutRequestCreate(CallOutRequestBase):
    pass


class CallOutRequestRead(CallOutRequestBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
