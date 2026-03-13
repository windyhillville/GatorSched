from pydantic import BaseModel, ConfigDict, EmailStr

from gatorsched_api.models.employee import AccessLevel

from .role import RoleRead


class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    max_weekly_hours: int | None = None
    access_level: AccessLevel = AccessLevel.employee
    is_active: bool = True
    role_id: int


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeRead(EmployeeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    role: RoleRead
