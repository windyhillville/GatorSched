from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.requests.employee_requests import EmployeeRequestsResponse
from gatorsched_api.services.requests.employee_requests import get_employee_requests

router = APIRouter(tags=["employee_requests"])


@router.get("/employee/requests", response_model=EmployeeRequestsResponse)
def get_all_employee_requests(
    viewer_id: int, db: Session = Depends(get_db)
) -> EmployeeRequestsResponse:
    return get_employee_requests(db, viewer_id)
