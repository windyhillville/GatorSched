from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from gatorsched_api.db.base import Base

if TYPE_CHECKING:
    from .employee import Employee


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    name: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)

    description: Mapped[str] = mapped_column(String(255), nullable=False)

    # Relationship
    employees: Mapped[list[Employee]] = relationship("Employee", back_populates="role")
