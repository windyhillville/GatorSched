from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.employee.availability.employee_availability import (
    EmployeeAvailability,
    EmployeeAvailabilityResponse,
)
from gatorsched_api.services.availability.formatters import build_employee_availability


def get_employee_availabilities(db: Session, viewer_id: int) -> EmployeeAvailabilityResponse:
    availability_stmt = (
        select(Availability).where(Availability.employee_id == viewer_id)
        # .order_by((Availability.day_of_week + 1) % 7, Availability.start_time)
    )
    availabilities = db.scalars(availability_stmt).unique().all()
    avail_map = {a.day_of_week: a for a in availabilities}

    employee_availabilities: list[EmployeeAvailability] = []

    # sunday_first_order = [6, 0, 1, 2, 3, 4, 5]
    for day_idx in range(7):
        day = avail_map.get(day_idx)

        employee_availability = build_employee_availability(day_idx, day)

        employee_availabilities.append(employee_availability)

    return EmployeeAvailabilityResponse(id=str(viewer_id), availabilities=employee_availabilities)
