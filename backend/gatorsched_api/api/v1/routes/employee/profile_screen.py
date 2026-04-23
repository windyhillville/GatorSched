from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.employee.profile.profile_screen import ProfileScreenResponse
from gatorsched_api.services.profile.profile_screen import get_profile_screen

router = APIRouter(tags=["profile_screen"])


@router.get("/employee/profile", response_model=ProfileScreenResponse)
def get_profile(viewer_id: int, db: Session = Depends(get_db)) -> ProfileScreenResponse:
    return get_profile_screen(db, viewer_id)
