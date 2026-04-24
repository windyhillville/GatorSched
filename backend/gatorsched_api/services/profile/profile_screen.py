from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee
from gatorsched_api.schemas.employee.profile.profile_screen import ProfileScreenResponse


def get_profile_screen(db: Session, viewer_id: int) -> ProfileScreenResponse:
    employee = db.scalars(
        select(Employee).where(Employee.id == viewer_id).options(joinedload(Employee.role))
    ).one()

    return ProfileScreenResponse(
        id=str(employee.id),
        name=employee.name,
        email=employee.email,
        phone=employee.phone,
        color=employee.color,
        avatarUrl=employee.avatar_url,
        role=employee.role.name,
        maxWeeklyHours=employee.max_weekly_hours,
        # accessLevel=employee.access_level,
    )
