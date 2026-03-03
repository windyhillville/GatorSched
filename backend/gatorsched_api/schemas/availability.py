from pydantic import BaseModel, ConfigDict
from datetime import time


class AvailabilityBase(BaseModel):
    day_of_week: int
    start_time: time
    end_time: time


class AvailabilityCreate(AvailabilityBase):
    pass


class AvailabilityRead(AvailabilityBase):
    model_config = ConfigDict(from_attributes=True)
    id: int