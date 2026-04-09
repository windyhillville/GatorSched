from __future__ import annotations

from enum import StrEnum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee
    from .shift import Shift


class PickUpRequestStatus(StrEnum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    cancelled = "cancelled"


class PickUpRequest(Base):
    __tablename__ = "pickup_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[str] = mapped_column(
        String(32),
        SAEnum(PickUpRequestStatus, name="pickup_request_status", native_enum=False),
        nullable=False,
        default=PickUpRequestStatus.pending,
    )

    # Foreign keys
    employee_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    shift_id: Mapped[int] = mapped_column(Integer, ForeignKey("shifts.id"), nullable=False)

    # Relationships
    employee: Mapped[Employee] = relationship("Employee", foreign_keys=[employee_id])
    shift: Mapped[Shift] = relationship("Shift", foreign_keys=[shift_id])
