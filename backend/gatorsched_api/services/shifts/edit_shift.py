from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.manager.shifts.edit_shift import (
    EditedShift,
    EditShiftRequest,
    EditShiftResponse,
)
from gatorsched_api.schemas.manager.shifts.shifts import (
    TimeRange,
)
from gatorsched_api.services.datetime_formatting import (
    format_time_label,
    get_day_key,
    get_long_day_label,
    get_short_day_label,
)


def edit_shift(shift_id: str, payload: EditShiftRequest, db: Session) -> EditShiftResponse:

    shiftStmt = select(Shift).where(Shift.id == int(shift_id)).options(joinedload(Shift.role))

    shift = db.scalars(shiftStmt).unique().one()

    start_time_string = (
        f"{payload.startTime.hour}:{payload.startTime.minute} {payload.startTime.period}"
    )
    start_time_obj = datetime.strptime(start_time_string, "%I:%M %p").time()

    end_time_string = f"{payload.endTime.hour}:{payload.endTime.minute} {payload.endTime.period}"
    end_time_obj = datetime.strptime(end_time_string, "%I:%M %p").time()

    shift.date = payload.date
    shift.start_time = start_time_obj
    shift.end_time = end_time_obj
    shift.min_staff_req = payload.staffingRequirement
    shift.role_id = int(payload.roleId)

    # new_shift = Shift(
    #     date=payload.date,
    #     start_time=start_time_obj,
    #     end_time=end_time_obj,
    #     min_staff_req=payload.staffingRequirement,
    #     role_id=payload.roleId,
    # )

    db.commit()

    updated_shift_stmt = (
        select(Shift).where(Shift.id == int(shift_id)).options(joinedload(Shift.role))
    )
    updated_shift = db.scalars(updated_shift_stmt).unique().one()

    return EditShiftResponse(
        shift=EditedShift(
            id=str(updated_shift.id),
            date=updated_shift.date,
            dayKey=get_day_key(updated_shift.date),
            shortDayLabel=get_short_day_label(updated_shift.date),
            longDayLabel=get_long_day_label(updated_shift.date),
            startTime=TimeRange(
                hour=updated_shift.start_time.strftime("%I"),
                minute=updated_shift.start_time.strftime("%M"),
                period=updated_shift.start_time.strftime("%p"),
            ),
            endTime=TimeRange(
                hour=updated_shift.end_time.strftime("%I"),
                minute=updated_shift.end_time.strftime("%M"),
                period=updated_shift.end_time.strftime("%p"),
            ),
            staffingRequirement=updated_shift.min_staff_req,
            roleId=str(updated_shift.role_id),
            roleName=updated_shift.role.name,
            roleColor=updated_shift.role.color,
            fromTime=format_time_label(updated_shift.start_time),
            toTime=format_time_label(updated_shift.end_time),
        )
    )
