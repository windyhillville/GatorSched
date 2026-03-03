from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.employee import Employee
from gatorsched_api.schemas.employee import EmployeeCreate, EmployeeRead

router = APIRouter(tags=["employees"])


@router.get("/employees", response_model=list[EmployeeRead])
def list_employees(db: Session = Depends(get_db)) -> list[EmployeeRead]:
    employees = db.query(Employee)
    return employees.all()


@router.post("/employees", response_model=EmployeeRead, status_code=201)
def create_employee(employee_in: EmployeeCreate, db: Session = Depends(get_db)) -> Employee:
    employee = Employee(**employee_in.model_dump())
    db.add(employee)
    db.commit()
    # Go back to DB and re-load the object's values
    db.refresh(employee)
    return employee
