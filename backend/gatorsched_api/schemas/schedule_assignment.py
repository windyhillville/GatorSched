from pydantic import BaseModel, ConfigDict


class ScheduleAssignmentBase(BaseModel):
    status: str = "assigned"

class ScheduleAssignmentCreate(ScheduleAssignmentBase):
    pass


class ScheduleAssignmentRead(ScheduleAssignmentBase):
    model_config = ConfigDict(from_attributes=True)
    id: int