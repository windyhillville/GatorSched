from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse
from gatorsched_api.services.requests.manager_reject_swap import reject_swap

router = APIRouter(tags=["swap_request"])


@router.post(
    "/manager/requests/{request_id}/reject",
    response_model=RequestDecisionResponse,
)
def reject_swap_request(request_id: int, db: Session = Depends(get_db)) -> RequestDecisionResponse:
    return reject_swap(request_id, db)
