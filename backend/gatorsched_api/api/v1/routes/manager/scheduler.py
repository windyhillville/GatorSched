from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.scheduler.scheduler import (
    GenerateScheduleRequest,
    GenerateScheduleResponse,
)
from gatorsched_api.services.scheduler.greedy import generate_schedule_for_date

router = APIRouter(tags=["scheduler"])


@router.post("/scheduler/generate", response_model=GenerateScheduleResponse)
def generate_schedule(
    payload: GenerateScheduleRequest, db: Session = Depends(get_db)
) -> GenerateScheduleResponse:
    print("ROUTE HIT")
    return generate_schedule_for_date(db, payload.date)
