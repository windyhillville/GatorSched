from __future__ import annotations


from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from gatorsched_api.db.base import Base


class ScheduleAssignment(Base):
    __tablename__ = "schedule_assignments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    status: Mapped[str] = mapped_column(String(32), nullable=False, default="assigned")