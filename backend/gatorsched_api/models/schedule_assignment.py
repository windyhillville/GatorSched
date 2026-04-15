from __future__ import annotations

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee
    from .shift import Shift


class AssignmentStatus(StrEnum):
    assigned = "assigned"


class ScheduleAssignment(Base):
    __tablename__ = "schedule_assignments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[AssignmentStatus] = mapped_column(
        SAEnum(AssignmentStatus, name="assignment_status", native_enum=False),
        nullable=False,
        default=AssignmentStatus.assigned,
    )

    # Foreign Keys
    employee_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    shift_id: Mapped[int] = mapped_column(Integer, ForeignKey("shifts.id"), nullable=False)

    # Relationships
    employee: Mapped[Employee] = relationship("Employee", back_populates="assignments")
    shift: Mapped[Shift] = relationship("Shift", back_populates="assignments")
