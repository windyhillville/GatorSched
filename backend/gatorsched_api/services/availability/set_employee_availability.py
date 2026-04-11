from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.features.availability.set_employee_availability import (
    SetEmployeeAvailabilityRequest,
    SetEmployeeAvailabilityResponse,
)
from gatorsched_api.services.availability.formatters import build_employee_availability


def set_availability(
    day_of_week: int, payload: SetEmployeeAvailabilityRequest, viewer_id: int, db: Session
) -> SetEmployeeAvailabilityResponse:
    if day_of_week < 0 or day_of_week > 6:
        raise ValueError("day_of_week must be between 0 and 6.")

    availability_stmt = select(Availability).where(
        Availability.employee_id == viewer_id, Availability.day_of_week == day_of_week
    )
    availability = db.scalars(availability_stmt).first()

    if payload.isAvailable:
        if availability:
            availability.start_time = payload.combined_start_time
            availability.end_time = payload.combined_end_time
        else:
            availability = Availability(
                employee_id=viewer_id,
                day_of_week=day_of_week,
                start_time=payload.combined_start_time,
                end_time=payload.combined_end_time,
            )
            db.add(availability)
    else:
        if availability:
            db.delete(availability)
            availability = None

    db.commit()

    return SetEmployeeAvailabilityResponse(
        dayOfWeek=day_of_week, availability=build_employee_availability(day_of_week, availability)
    )
