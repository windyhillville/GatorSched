from pydantic import BaseModel, ConfigDict

from .employee import EmployeeRead
from .shift import ShiftRead


class ScheduleAssignmentBase(BaseModel):
    status: str = "assigned"
    employee_id: int
    shift_id: int


class ScheduleAssignmentCreate(ScheduleAssignmentBase):
    pass


class ScheduleAssignmentRead(ScheduleAssignmentBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    employee: EmployeeRead
    shift: ShiftRead
