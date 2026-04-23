from datetime import UTC, datetime, timedelta

import jwt
from fastapi import HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from gatorsched_api.models.employee import Employee
from gatorsched_api.schemas.auth.login import LoginRequest, LoginResponse, UserCredentials

# NOT SECURE FOR PRODUCTION
SECRET_KEY = "super-secret-dev-key-123"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(user_id: int, access_level: str) -> str:

    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": str(user_id),
        "access_level": access_level,
        "exp": expire,
        "type": "access",
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


password_hash = PasswordHash.recommended()


def login(payload: LoginRequest, db: Session) -> LoginResponse:
    employee = db.scalars(select(Employee).where(Employee.email == payload.email)).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not password_hash.verify(payload.password, employee.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(employee.id, employee.access_level.value)

    return LoginResponse(
        accessToken=token,
        user=UserCredentials(
            id=str(employee.id),
            name=employee.name,
            accessLevel=employee.access_level,
        ),
    )
