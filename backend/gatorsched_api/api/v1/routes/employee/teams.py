from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from gatorsched_api.db.deps import get_db
from gatorsched_api.schemas.features.teams import TeamsResponse
from gatorsched_api.services.teams.roster import get_roster

router = APIRouter(tags=["teams"])


@router.get("/teams", response_model=TeamsResponse)
def get_teams(date: date, db: Session = Depends(get_db)) -> TeamsResponse:
    return get_roster(db, date)
