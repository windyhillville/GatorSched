from pydantic import BaseModel


class ProfileScreenResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str | None = None
    color: str
    avatarUrl: str | None = None
    role: str
    maxWeeklyHours: int | None = None
    # accessLevel: AccessLevel
