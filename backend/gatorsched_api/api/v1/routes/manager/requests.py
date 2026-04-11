from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.manager.requests.manager_requests import ManagerRequestCardResponse
from gatorsched_api.services.requests.manager_requests import get_manager_requests

router = APIRouter(tags=["scheduler"])


@router.get("/manager/requests", response_model=ManagerRequestCardResponse)
def get_all_manager_requests(db: Session = Depends(get_db)) -> ManagerRequestCardResponse:
    print("ROUTE HIT")
    return get_manager_requests(db)
