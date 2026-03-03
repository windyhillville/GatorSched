from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from gatorsched_api.db.base import Base
from gatorsched_api.db.deps import get_db
from gatorsched_api.main import app
from gatorsched_api.models.role import Role

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
    # ruff: noqa: I001
    from gatorsched_api.models.availability import Availability  # noqa: F401
    from gatorsched_api.models.employee import Employee  # noqa: F401
    from gatorsched_api.models.role import Role  # noqa: F401
    from gatorsched_api.models.schedule_assignment import ScheduleAssignment  # noqa: F401
    from gatorsched_api.models.shift import Shift  # noqa: F401
    from gatorsched_api.models.swap_request import SwapRequest  # noqa: F401

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


@event.listens_for(engine, "connect")
def enable_foreign_keys(dbapi_conn, connection_record):
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


@pytest.fixture()
def cashier_role(db_session):
    role = db_session.query(Role).filter(Role.name == "Cashier").first()
    if not role:
        role = Role(
            name="Cashier",
            description="Handles checkout.",
        )
        db_session.add(role)
        db_session.commit()
        db_session.refresh(role)

    return role.id
