from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.shifts.shifts import ShiftsResponse
from gatorsched_api.services.shifts.render_shifts import get_shifts

router = APIRouter(tags=["scheduler"])


@router.get("/manager/shifts/render", response_model=ShiftsResponse)
def render_shifts(week_start: date, db: Session = Depends(get_db)) -> ShiftsResponse:
    print("ROUTE HIT")
    return get_shifts(week_start, db)
