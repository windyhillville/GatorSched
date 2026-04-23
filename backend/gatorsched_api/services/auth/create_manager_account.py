import random

from fastapi import HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.role import Role
from gatorsched_api.schemas.auth.create_manager_account import (
    CreateManagerAccountRequest,
    CreateManagerAccountResponse,
)

from .colors import MANAGER_COLORS, ROLE_COLORS

password_hash = PasswordHash.recommended()


def create_manager_account(
    payload: CreateManagerAccountRequest, db: Session
) -> CreateManagerAccountResponse:
    existing_account_stmt = select(Employee).where(Employee.email == payload.email)
    existing_account = db.scalars(existing_account_stmt).first()

    if existing_account:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    normalized_roles: list[str] = []
    seen = set()
    for role_name in payload.roles:
        cleaned = role_name.strip()
        if not cleaned:
            continue
        lowered = cleaned.lower()
        if lowered in seen:
            continue
        seen.add(lowered)
        normalized_roles.append(cleaned)

    # Find or create the Manager role
    manager_role_stmt = select(Role).where(Role.name == "Manager")
    manager_role = db.scalars(manager_role_stmt).first()

    if not manager_role:
        used_role_colors = set(db.scalars(select(Role.color)).all())
        available_role_colors = [c for c in ROLE_COLORS if c not in used_role_colors]

        manager_role = Role(
            name="Manager",
            color=random.choice(available_role_colors or ROLE_COLORS),
            description="",
        )
        db.add(manager_role)
        db.flush()  # ensures manager_role.id exists before creating employee

    # Create additional roles from payload, excluding Manager
    existing_role_names = {name.lower() for name in db.scalars(select(Role.name)).all()}
    used_role_colors = set(db.scalars(select(Role.color)).all())

    roles_to_create: list[Role] = []
    for role_name in normalized_roles:
        formatted_name = role_name.title()
        lower_name = formatted_name.lower()

        if lower_name == "manager":
            continue

        if lower_name in existing_role_names:
            continue

        available_role_colors = [c for c in ROLE_COLORS if c not in used_role_colors]
        chosen_role_color = random.choice(available_role_colors or ROLE_COLORS)
        used_role_colors.add(chosen_role_color)

        roles_to_create.append(
            Role(
                name=formatted_name,
                color=chosen_role_color,
                description="",
            )
        )

        existing_role_names.add(lower_name)  # prevents duplicates in same request

    db.add_all(roles_to_create)

    # Assign manager avatar color
    used_employee_colors = set(db.scalars(select(Employee.color)).all())
    available_employee_colors = [c for c in MANAGER_COLORS if c not in used_employee_colors]

    new_account = Employee(
        name=payload.name,
        email=payload.email,
        password_hash=password_hash.hash(payload.password),
        phone=payload.phone,
        color=random.choice(available_employee_colors or MANAGER_COLORS),
        avatar_url=payload.avatarUrl,
        max_weekly_hours=40,
        access_level=AccessLevel.manager,
        is_active=payload.isActive,
        role_id=manager_role.id,
    )

    db.add(new_account)
    db.commit()
    db.refresh(new_account)

    return CreateManagerAccountResponse(success=True)
