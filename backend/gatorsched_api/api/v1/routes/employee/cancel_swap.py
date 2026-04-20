from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse
from gatorsched_api.services.requests.employee_cancel_swap import cancel_swap

router = APIRouter(tags=["swap_request"])


@router.post(
    "/employee/requests/{request_id}/cancel",
    response_model=RequestDecisionResponse,
)
def cancel_swap_request(request_id: int, db: Session = Depends(get_db)) -> RequestDecisionResponse:
    return cancel_swap(request_id, db)
