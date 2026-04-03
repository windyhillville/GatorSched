from datetime import date

from pydantic import BaseModel


class TeamMemberSchedule(BaseModel):
    id: str
    day: date  # needs to be converted to a string  most likely
    timeRange: str


class TeamMemberCard(BaseModel):
    id: str
    name: str
    role: str
    color: str | None = None
    avatarUrl: str | None = None
    totalHours: float
    schedule: list[TeamMemberSchedule]


class TeamGroup(BaseModel):
    role: str
    members: list[TeamMemberCard]


class TeamsResponse(BaseModel):
    groups: list[TeamGroup]
