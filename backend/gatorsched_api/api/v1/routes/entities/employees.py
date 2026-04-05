from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.employee import Employee
from gatorsched_api.schemas.entities.employee import EmployeeCreate, EmployeeRead

router = APIRouter(tags=["employees"])


@router.get("/employees", response_model=list[EmployeeRead])
def list_employees(
    db: Session = Depends(get_db),
) -> list[Employee]:  # NOTE: Changed to Employee from EmployeeRead
    stmt = select(Employee).options(joinedload(Employee.role))
    return db.scalars(stmt).all()


# employees = db.query(Employee)
# return employees.all()


@router.post("/employees", response_model=EmployeeRead, status_code=201)
def create_employee(employee_in: EmployeeCreate, db: Session = Depends(get_db)) -> Employee:
    employee = Employee(**employee_in.model_dump())
    db.add(employee)
    db.commit()
    # Go back to DB and re-load the object's values
    db.refresh(employee)
    stmt = select(Employee).where(Employee.id == employee.id).options(joinedload(Employee.role))
    return db.scalars(stmt).one()
    # return employee
