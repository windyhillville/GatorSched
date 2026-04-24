from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus

if TYPE_CHECKING:
    from .employee import Employee
    from .schedule_assignment import ScheduleAssignment


class SwapRequest(Base):
    __tablename__ = "swap_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    employee_status: Mapped[EmployeeRequestStatus] = mapped_column(
        SAEnum(EmployeeRequestStatus, name="employee_request_status", native_enum=False),
        nullable=False,
        default=EmployeeRequestStatus.pending,
    )

    manager_status: Mapped[ManagerRequestStatus] = mapped_column(
        SAEnum(ManagerRequestStatus, name="manager_request_status", native_enum=False),
        nullable=False,
        default=ManagerRequestStatus.not_sent,
    )
    # Foreign keys
    requester_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    cover_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    requester_assignment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("schedule_assignments.id"), nullable=False
    )
    cover_assignment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("schedule_assignments.id"), nullable=False
    )

    # Relationships
    requester: Mapped[Employee] = relationship("Employee", foreign_keys=[requester_id])
    cover_employee: Mapped[Employee] = relationship("Employee", foreign_keys=[cover_id])
    # assignment: Mapped[ScheduleAssignment] = relationship("ScheduleAssignment")
    requester_assignment: Mapped[ScheduleAssignment] = relationship(
        "ScheduleAssignment", foreign_keys=[requester_assignment_id]
    )
    cover_assignment: Mapped[ScheduleAssignment] = relationship(
        "ScheduleAssignment", foreign_keys=[cover_assignment_id]
    )
