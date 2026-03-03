from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.role import Role
from gatorsched_api.schemas.role import RoleCreate, RoleRead

router = APIRouter(tags=["roles"])


@router.get("/roles", response_model=list[RoleRead])
def list_roles(db: Session = Depends(get_db)) -> list[RoleRead]:
    roles = db.query(Role)
    return roles.all()


@router.post("/roles", response_model=RoleRead, status_code=201)
def create_role(role_in: RoleCreate, db: Session = Depends(get_db)) -> Role:
    role = Role(**role_in.model_dump())
    db.add(role)
    db.commit()
    db.refresh(role)
    return role
