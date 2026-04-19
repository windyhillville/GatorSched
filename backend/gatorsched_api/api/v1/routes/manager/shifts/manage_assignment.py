from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.shifts.manage_assignment import (
    ManageAssignmentRequest,
    ManageAssignmentResponse,
)
from gatorsched_api.services.shifts.manage_assignment import edit_assignment

router = APIRouter(tags=["scheduler"])


@router.put("/manager/shifts/{shift_id}/assignments", response_model=ManageAssignmentResponse)
def manage_assignment(
    shift_id: str, payload: ManageAssignmentRequest, db: Session = Depends(get_db)
) -> ManageAssignmentResponse:
    print("ROUTE HIT")
    return edit_assignment(shift_id, payload, db)
