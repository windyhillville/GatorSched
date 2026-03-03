from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from gatorsched_api.db.base import Base
from gatorsched_api.db.deps import get_db
from gatorsched_api.main import app

SQLALCHEMY_DATABASE_URL = "sqlite://"

# - sqlite:// (no file path) + StaticPool keeps ONE in-memory DB alive across entire testing suite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def override_get_db() -> Generator[Session, None, None]:
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="session", autouse=True)
def create_test_db() -> Generator[None, None, None]:
    # Import models so SQLAlchemy knows about them before create_all()
    from gatorsched_api.models import (
        availability,  # noqa: F401
        employee,  # noqa: F401
        role,  # noqa: F401
        schedule_assignment,  # noqa: F401
        shift,  # noqa: F401
        swap_request,  # noqa: F401
    )

    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client() -> Generator[TestClient, None, None]:
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture()
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
