from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.render_swap_request_info import (
    EmployeeSwapRequestInfoResponse,
)
from gatorsched_api.services.requests.render_swap_request_info import get_swap_request_info

router = APIRouter(tags=["swap_request"])


@router.get(
    "/employee/requests/swap-options",
    response_model=EmployeeSwapRequestInfoResponse,
)
def render_swap_request_info(
    viewer_id: int, week_start: date, db: Session = Depends(get_db)
) -> EmployeeSwapRequestInfoResponse:
    return get_swap_request_info(viewer_id, week_start, db)
