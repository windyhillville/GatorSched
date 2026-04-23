import random

from fastapi import HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.role import Role
from gatorsched_api.schemas.auth.create_employee_account import (
    CreateEmployeeAccountRequest,
    CreateEmployeeAccountResponse,
)

from .colors import EMPLOYEE_COLORS

password_hash = PasswordHash.recommended()


def create_employee_account(
    payload: CreateEmployeeAccountRequest, db: Session
) -> CreateEmployeeAccountResponse:

    existing_account_stmt = select(Employee).where(Employee.email == payload.email)
    existing_account = db.scalars(existing_account_stmt).unique().first()

    normalized_role_name = payload.roleName.strip().lower()

    roles = db.scalars(select(Role)).all()
    role = next((r for r in roles if r.name.strip().lower() == normalized_role_name), None)

    if existing_account:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This role does not exist.",
        )

    used_colors = set(db.scalars(select(Employee.color)).all())
    available_colors = [c for c in EMPLOYEE_COLORS if c not in used_colors]
    color = random.choice(available_colors or EMPLOYEE_COLORS)

    new_account = Employee(
        name=payload.name,
        email=payload.email,
        password_hash=password_hash.hash(payload.password),
        phone=payload.phone,
        color=color,
        avatar_url=payload.avatarUrl,
        max_weekly_hours=32,
        access_level=AccessLevel.employee,
        is_active=payload.isActive,
        role_id=role.id,
    )

    db.add(new_account)
    db.commit()
    db.refresh(new_account)

    return CreateEmployeeAccountResponse(success=True)
