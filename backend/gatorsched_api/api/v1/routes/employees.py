from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.employee import Employee
from gatorsched_api.schemas.employee import EmployeeRead

router = APIRouter(tags=["employees"])


@router.get("/employees", response_model=list[EmployeeRead])
def list_employees(db: Session = Depends(get_db)) -> list[EmployeeRead]:
    employees = db.query(Employee)
    return employees.all()
