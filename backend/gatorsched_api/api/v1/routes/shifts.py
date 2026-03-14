from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.shift import ShiftCreate, ShiftRead

router = APIRouter(tags=["shifts"])


@router.get("/shifts", response_model=list[ShiftRead])
def list_shifts(db: Session = Depends(get_db)) -> list[ShiftRead]:
    stmt = select(Shift).options(joinedload(Shift.role))
    return db.scalars(stmt).all()


# shifts = db.query(Shift)
# return shifts.all()


@router.post("/shifts", response_model=ShiftRead, status_code=201)
def create_shift(shift_in: ShiftCreate, db: Session = Depends(get_db)) -> Shift:
    shift = Shift(**shift_in.model_dump())
    db.add(shift)
    db.commit()
    db.refresh(shift)
    return db.scalars(
        select(Shift).where(Shift.id == shift.id).options(joinedload(Shift.role))
    ).one()
    # return shift
