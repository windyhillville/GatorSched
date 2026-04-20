from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse
from gatorsched_api.services.requests.manager_approve_swap import approve_swap

router = APIRouter(tags=["swap_request"])


@router.post(
    "/manager/requests/{request_id}/approve",
    response_model=RequestDecisionResponse,
)
def approve_swap_request(request_id: int, db: Session = Depends(get_db)) -> RequestDecisionResponse:
    return approve_swap(request_id, db)
