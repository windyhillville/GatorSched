from __future__ import annotations

from datetime import date, time
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, Integer, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .role import Role
    from .schedule_assignment import ScheduleAssignment


class Shift(Base):
    __tablename__ = "shifts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    date: Mapped[date] = mapped_column(Date, index=True)

    start_time: Mapped[time] = mapped_column(Time, nullable=False)

    end_time: Mapped[time] = mapped_column(Time, nullable=False)

    min_staff_req: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    # There should always be at least 1 staff on any given shift.

    # Foreign key
    role_id: Mapped[int] = mapped_column(Integer, ForeignKey("roles.id"), nullable=False)

    # Relationship to the Role & ScheduleAssignment
    role: Mapped[Role] = relationship("Role")
    assignments: Mapped[list[ScheduleAssignment]] = relationship(
        "ScheduleAssignment", back_populates="shift"
    )
