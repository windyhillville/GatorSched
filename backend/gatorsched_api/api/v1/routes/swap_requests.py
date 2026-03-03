from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.schemas.swap_request import SwapRequestRead

router = APIRouter(tags=["swap_requests"])

@router.get("/swap_requests", response_model=list[SwapRequestRead])
def list_swap_requests(db: Session = Depends(get_db)) -> list[SwapRequestRead]:
    swap_requests = db.query(SwapRequest)
    return swap_requests.all()