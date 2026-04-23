from pydantic import BaseModel, EmailStr


class CreateEmployeeAccountRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str | None = None
    avatarUrl: str | None = None
    isActive: bool
    roleName: str


class CreateEmployeeAccountResponse(BaseModel):
    success: bool
