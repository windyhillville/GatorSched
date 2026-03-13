from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee
    from .shift import Shift


class ScheduleAssignment(Base):
    __tablename__ = "schedule_assignments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[str] = mapped_column(String(32), nullable=False, default="assigned")

    # Foreign Keys
    employee_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    shift_id: Mapped[int] = mapped_column(Integer, ForeignKey("shifts.id"), nullable=False)

    # Relationships
    employee: Mapped[Employee] = relationship("Employee", back_populates="assignments")
    shift: Mapped[Shift] = relationship("Shift", back_populates="assignments")
