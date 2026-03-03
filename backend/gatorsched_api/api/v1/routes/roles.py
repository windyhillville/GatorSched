from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.role import Role
from gatorsched_api.schemas.role import RoleRead

router = APIRouter(tags=["roles"])

@router.get("/roles", response_model=list[RoleRead])
def list_roles(db: Session = Depends(get_db)) -> list[RoleRead]:
    roles = db.query(Role)
    return roles.all()