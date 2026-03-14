from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.schemas.swap_request import SwapRequestCreate, SwapRequestRead

router = APIRouter(tags=["swap_requests"])


@router.get("/swap_requests", response_model=list[SwapRequestRead])
def list_swap_requests(db: Session = Depends(get_db)) -> list[SwapRequestRead]:
    stmt = select(SwapRequest).options(
        joinedload(SwapRequest.requester), joinedload(SwapRequest.assignment)
    )
    return db.scalars(stmt).all()
    # swap_requests = db.query(SwapRequest)
    # return swap_requests.all()


@router.post("/swap_requests", response_model=SwapRequestRead, status_code=201)
def create_swap_request(swap_in: SwapRequestCreate, db: Session = Depends(get_db)) -> SwapRequest:
    swap_request = SwapRequest(**swap_in.model_dump())
    db.add(swap_request)
    db.commit()
    db.refresh(swap_request)
    return swap_request
