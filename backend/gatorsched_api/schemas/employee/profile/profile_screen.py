from pydantic import BaseModel

from gatorsched_api.models.employee import AccessLevel


class ProfileScreenResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str | None = None
    color: str
    role: str
    maxWeeklyHours: int | None = None
    accessLevel: AccessLevel
