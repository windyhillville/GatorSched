from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse
from gatorsched_api.services.requests.employee_decline_swap import decline_swap

router = APIRouter(tags=["swap_request"])


@router.post(
    "/employee/requests/{request_id}/decline",
    response_model=RequestDecisionResponse,
)
def decline_swap_request(request_id: int, db: Session = Depends(get_db)) -> RequestDecisionResponse:
    return decline_swap(request_id, db)
