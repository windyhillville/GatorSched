from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.manager.shifts.create_shift import (
    CreateShiftRequest,
    CreateShiftResponse,
)
from gatorsched_api.schemas.manager.shifts.shared_types import EditedShift, TimeRange
from gatorsched_api.services.datetime_formatting import (
    format_time_label,
    get_day_key,
    get_long_day_label,
    get_short_day_label,
)


def create_shift(payload: CreateShiftRequest, db: Session) -> CreateShiftResponse:

    start_time_string = (
        f"{payload.startTime.hour}:{payload.startTime.minute} {payload.startTime.period}"
    )
    start_time_obj = datetime.strptime(start_time_string, "%I:%M %p").time()

    end_time_string = f"{payload.endTime.hour}:{payload.endTime.minute} {payload.endTime.period}"
    end_time_obj = datetime.strptime(end_time_string, "%I:%M %p").time()

    new_shift = Shift(
        date=payload.date,
        start_time=start_time_obj,
        end_time=end_time_obj,
        min_staff_req=payload.staffingRequirement,
        role_id=int(payload.roleId),
    )
    db.add(new_shift)
    db.commit()

    shift_stmt = select(Shift).where(Shift.id == new_shift.id).options(joinedload(Shift.role))
    created_shift = db.scalars(shift_stmt).unique().one()

    return CreateShiftResponse(
        shift=EditedShift(
            id=str(created_shift.id),
            date=created_shift.date,
            dayKey=get_day_key(created_shift.date),
            shortDayLabel=get_short_day_label(created_shift.date),
            longDayLabel=get_long_day_label(created_shift.date),
            startTime=TimeRange(
                hour=created_shift.start_time.strftime("%I"),
                minute=created_shift.start_time.strftime("%M"),
                period=created_shift.start_time.strftime("%p"),
            ),
            endTime=TimeRange(
                hour=created_shift.end_time.strftime("%I"),
                minute=created_shift.end_time.strftime("%M"),
                period=created_shift.end_time.strftime("%p"),
            ),
            staffingRequirement=created_shift.min_staff_req,
            roleId=str(created_shift.role_id),
            roleName=created_shift.role.name,
            roleColor=created_shift.role.color,
            fromTime=format_time_label(created_shift.start_time),
            toTime=format_time_label(created_shift.end_time),
        )
    )
