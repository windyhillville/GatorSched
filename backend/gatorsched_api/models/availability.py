from __future__ import annotations


from sqlalchemy import Integer, Time
from sqlalchemy.orm import Mapped, mapped_column
from datetime import time

from gatorsched_api.db.base import Base


class Availability(Base):
    __tablename__ = "availabilities"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    day_of_week: Mapped[int] = mapped_column(Integer, nullable=False)
    # Monday = 0, Tuesday = 1 ... Sunday = 6

    start_time: Mapped[time] = mapped_column(Time, nullable=False)

    end_time: Mapped[time] = mapped_column(Time, nullable=False)