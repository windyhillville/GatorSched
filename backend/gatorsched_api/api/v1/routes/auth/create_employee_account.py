from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.auth.create_employee_account import (
    CreateEmployeeAccountRequest,
    CreateEmployeeAccountResponse,
)
from gatorsched_api.services.auth.create_employee_account import create_employee_account

router = APIRouter(tags=["auth"])


@router.post(
    "/auth/create-employee-account",
    response_model=CreateEmployeeAccountResponse,
)
def employee_account_creation(
    payload: CreateEmployeeAccountRequest, db: Session = Depends(get_db)
) -> CreateEmployeeAccountResponse:
    return create_employee_account(payload, db)
