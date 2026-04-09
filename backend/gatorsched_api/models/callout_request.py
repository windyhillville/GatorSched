from __future__ import annotations

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee
    from .schedule_assignment import ScheduleAssignment


class CallOutStatus(StrEnum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    cancelled = "cancelled"


class CallOutRequest(Base):
    __tablename__ = "callout_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[str] = mapped_column(
        String(32),
        SAEnum(CallOutStatus, name="callout_request_status", native_enum=False),
        nullable=False,
        default=CallOutStatus.pending,
    )

    reason: Mapped[str | None] = mapped_column(String(500), nullable=True)

    # Foreign keys
    employee_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    assignment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("schedule_assignments.id"), nullable=False
    )

    # Relationships
    employee: Mapped[Employee] = relationship("Employee", foreign_keys=[employee_id])
    assignment: Mapped[ScheduleAssignment] = relationship(
        "ScheduleAssignment", foreign_keys=[assignment_id]
    )
