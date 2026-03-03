from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.availability import AvailabilityRead

router = APIRouter(tags=["availabilities"])


@router.get("/availabilities", response_model=list[AvailabilityRead])
def list_availabilities(db: Session = Depends(get_db)) -> list[AvailabilityRead]:
    availabilities = db.query(Availability)
    return availabilities.all()
