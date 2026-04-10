from __future__ import annotations

from datetime import time
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, Integer, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee


class Availability(Base):
    __tablename__ = "availabilities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    day_of_week: Mapped[int] = mapped_column(Integer, nullable=False)
    # Monday = 0, Tuesday = 1 ... Sunday = 6

    start_time: Mapped[time] = mapped_column(Time, nullable=False)

    end_time: Mapped[time] = mapped_column(Time, nullable=False)

    # Foreign Key: Belongs to an employee.
    employee_id: Mapped[int] = mapped_column(Integer, ForeignKey("employees.id"), nullable=False)

    # Relationship back to Employee
    employee: Mapped[Employee] = relationship("Employee", back_populates="availabilities")

    __table_args__ = (
        # Ensures start time is actually before end time
        CheckConstraint("start_time < end_time", name="check_start_before_end"),
    )
