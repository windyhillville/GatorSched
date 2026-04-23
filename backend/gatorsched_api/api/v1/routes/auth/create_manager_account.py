from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.auth.create_manager_account import (
    CreateManagerAccountRequest,
    CreateManagerAccountResponse,
)
from gatorsched_api.services.auth.create_manager_account import create_manager_account

router = APIRouter(tags=["auth"])


@router.post(
    "/auth/create-manager-account",
    response_model=CreateManagerAccountResponse,
)
def manager_account_creation(
    payload: CreateManagerAccountRequest, db: Session = Depends(get_db)
) -> CreateManagerAccountResponse:
    return create_manager_account(payload, db)
