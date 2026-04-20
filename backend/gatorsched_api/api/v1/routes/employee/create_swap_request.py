from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.create_swap_request import (
    CreateSwapRequestPayload,
    CreateSwapResponse,
)
from gatorsched_api.services.requests.create_swap_request import add_swap_request

router = APIRouter(tags=["swap_request"])


@router.post(
    "/employee/requests/swap",
    response_model=CreateSwapResponse,
)
def create_swap_request(
    payload: CreateSwapRequestPayload, db: Session = Depends(get_db)
) -> CreateSwapResponse:
    return add_swap_request(payload, db)
