from pydantic import BaseModel, EmailStr


class CreateManagerAccountRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str | None = None
    avatarUrl: str | None = None
    isActive: bool
    roles: str


class CreateManagerAccountResponse(BaseModel):
    success: bool
