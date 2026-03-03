from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.shift import ShiftRead

router = APIRouter(tags=["shifts"])


@router.get("/shifts", response_model=list[ShiftRead])
def list_shifts(db: Session = Depends(get_db)) -> list[ShiftRead]:
    shifts = db.query(Shift)
    return shifts.all()
