from __future__ import annotations

from enum import StrEnum

from sqlalchemy import Boolean, Integer, String
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column

from gatorsched_api.db.base import Base


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
