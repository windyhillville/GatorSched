from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.pickup_request import PickUpRequest
from gatorsched_api.schemas.entities.pickup_request import PickUpRequestCreate, PickUpRequestRead

router = APIRouter(tags=["pickup_requests"])


@router.get("/pickup_requests", response_model=list[PickUpRequestRead])
def list_pickup_requests(db: Session = Depends(get_db)) -> list[PickUpRequestRead]:
    stmt = select(PickUpRequest).options(
        joinedload(PickUpRequest.employee),
        joinedload(PickUpRequest.shift),
    )
    return db.scalars(stmt).all()


@router.post("/pickup_requests", response_model=PickUpRequestRead, status_code=201)
def create_pickup_request(request_in: PickUpRequestCreate, db: Session = Depends(get_db)) -> PickUpRequest:
    pickup_request = PickUpRequest(**request_in.model_dump())
    db.add(pickup_request)
    db.commit()
    db.refresh(pickup_request)
    return pickup_request