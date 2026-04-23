from pydantic import BaseModel, EmailStr

from gatorsched_api.models.employee import AccessLevel


class UserCredentials(BaseModel):
    id: str
    name: str
    accessLevel: AccessLevel


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    accessToken: str
    user: UserCredentials
