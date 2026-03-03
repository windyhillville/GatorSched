from datetime import date, time

from pydantic import BaseModel, ConfigDict


class ShiftBase(BaseModel):
    date: date
    start_time: time
    end_time: time
    min_staff_req: int = 1
    role_id: int


class ShiftCreate(ShiftBase):
    pass


class ShiftRead(ShiftBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
