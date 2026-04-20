from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus
from gatorsched_api.schemas.employee.requests.request_decision import RequestDecisionResponse


def approve_swap(request_id: int, db: Session) -> RequestDecisionResponse:
    swap_request_stmt = select(SwapRequest).where(SwapRequest.id == request_id)
    swap_request = db.scalars(swap_request_stmt).unique().one()

    swap_request.employee_status = EmployeeRequestStatus.accepted
    swap_request.manager_status = ManagerRequestStatus.approved

    db.commit()
    db.refresh(swap_request)

    return RequestDecisionResponse(success=True)
