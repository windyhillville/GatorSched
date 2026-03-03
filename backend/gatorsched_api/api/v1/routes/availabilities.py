from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.models.availability import Availability
from gatorsched_api.schemas.availability import AvailabilityRead
from gatorsched_api.schemas.availability import AvailabilityCreate

router = APIRouter(tags=["availabilities"])


@router.get("/availabilities", response_model=list[AvailabilityRead])
def list_availabilities(db: Session = Depends(get_db)) -> list[AvailabilityRead]:
    availabilities = db.query(Availability)
    return availabilities.all()

@router.post("/availabilities", response_model=AvailabilityRead, status_code=201)
def create_availability(availability_in: AvailabilityCreate, db: Session = Depends(get_db)) -> Availability:
    availability = Availability(**availability_in.model_dump())
    db.add(availability)
    db.commit()
    db.refresh(availability)
    return availability