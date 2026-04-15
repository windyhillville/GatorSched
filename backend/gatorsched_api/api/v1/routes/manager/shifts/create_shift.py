from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.shifts.create_shift import (
    CreateShiftRequest,
    CreateShiftResponse,
)
from gatorsched_api.services.shifts.create_shift import create_shift

router = APIRouter(tags=["scheduler"])


@router.post("/manager/shifts/create", response_model=CreateShiftResponse)
def add_shift(payload: CreateShiftRequest, db: Session = Depends(get_db)) -> CreateShiftResponse:
    print("ROUTE HIT")
    return create_shift(payload, db)
