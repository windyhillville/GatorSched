from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.scheduler.scheduler import (
    GenerateScheduleResponse,
)
from gatorsched_api.services.scheduler.render_schedule import get_scheduled_data

router = APIRouter(tags=["scheduler"])


@router.get("/scheduler/render", response_model=GenerateScheduleResponse)
def get_schedule(week_start: date, db: Session = Depends(get_db)) -> GenerateScheduleResponse:
    return get_scheduled_data(week_start, db)
