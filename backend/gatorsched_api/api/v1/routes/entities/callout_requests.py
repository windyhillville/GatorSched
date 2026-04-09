from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.callout_request import CallOutRequest
from gatorsched_api.schemas.entities.callout_request import CallOutRequestCreate, CallOutRequestRead

router = APIRouter(tags=["callout_requests"])


@router.get("/callout_requests", response_model=list[CallOutRequestRead])
def list_callout_requests(db: Session = Depends(get_db)) -> list[CallOutRequestRead]:
    stmt = select(CallOutRequest).options(
        joinedload(CallOutRequest.employee),
        joinedload(CallOutRequest.assignment),
    )
    return db.scalars(stmt).all()


@router.post("/callout_requests", response_model=CallOutRequestRead, status_code=201)
def create_callout_request(
    request_in: CallOutRequestCreate, db: Session = Depends(get_db)
) -> CallOutRequest:
    callout_request = CallOutRequest(**request_in.model_dump())
    db.add(callout_request)
    db.commit()
    db.refresh(callout_request)
    return callout_request
