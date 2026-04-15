from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.shifts.edit_shift import EditShiftRequest, EditShiftResponse
from gatorsched_api.services.shifts.edit_shift import edit_shift

router = APIRouter(tags=["scheduler"])


@router.put("/manager/shifts/{shift_id}", response_model=EditShiftResponse)
def update_shift(
    shift_id: str, payload: EditShiftRequest, db: Session = Depends(get_db)
) -> EditShiftResponse:
    print("ROUTE HIT")
    return edit_shift(shift_id, payload, db)
