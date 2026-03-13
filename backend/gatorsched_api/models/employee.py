from __future__ import annotations

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .availability import Availability
    from .role import Role
    from .schedule_assignment import ScheduleAssignment


class AccessLevel(StrEnum):
    employee = "employee"
    manager = "manager"
    owner = "owner"


class Employee(Base):
    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(120), nullable=False)

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)

    phone: Mapped[str | None] = mapped_column(String(32), nullable=True)

    max_weekly_hours: Mapped[int | None] = mapped_column(Integer, nullable=True)

    access_level: Mapped[AccessLevel] = mapped_column(
        SAEnum(AccessLevel, name="access_level", native_enum=False),
        nullable=False,
        default=AccessLevel.employee,
    )

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Foreign Key: Employee has a role.
    role_id: Mapped[int] = mapped_column(Integer, ForeignKey("roles.id"), nullable=False)

    # Relationships
    role: Mapped[Role] = relationship("Role", back_populates="employees")
    availabilities: Mapped[list[Availability]] = relationship(
        "Availability", back_populates="employee"
    )
    assignments: Mapped[list[ScheduleAssignment]] = relationship(
        "ScheduleAssignment", back_populates="employee"
    )
