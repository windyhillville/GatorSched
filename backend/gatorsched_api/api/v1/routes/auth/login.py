from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.auth.login import LoginRequest, LoginResponse
from gatorsched_api.services.auth.login import login

router = APIRouter(tags=["auth"])


@router.post(
    "/auth/login",
    response_model=LoginResponse,
)
def manager_account_creation(payload: LoginRequest, db: Session = Depends(get_db)) -> LoginResponse:
    return login(payload, db)
