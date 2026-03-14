from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee
    from .schedule_assignment import ScheduleAssignment


class SwapRequest(Base):
    __tablename__ = "swap_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[str] = mapped_column(String(32), nullable=False, default="pending")

    # Foreign keys
    requester_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    cover_id: Mapped[int | None] = mapped_column(Integer, ForeignKey("employees.id"), nullable=True)

    schedule_assignment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("schedule_assignments.id"), nullable=False
    )

    # Relationships
    requester: Mapped[Employee] = relationship("Employee", foreign_keys=[requester_id])
    cover_employee: Mapped[Employee | None] = relationship("Employee", foreign_keys=[cover_id])
    assignment: Mapped[ScheduleAssignment] = relationship("ScheduleAssignment")
