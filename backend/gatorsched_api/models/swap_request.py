from __future__ import annotations

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from gatorsched_api.db.base import Base


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
