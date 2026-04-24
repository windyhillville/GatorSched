from datetime import date, time

import pytest

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.shift import Shift


def test_pickup_requests_returns_200(client):
    res = client.get("/api/v1/pickup_requests")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_create_pickup_request(client, db_session, cashier_role):
    employee = Employee(
        name="Pickup Test",
        email="pickup@example.com",
        password_hash=pytest.dummy_hash,
        access_level=AccessLevel.employee,
        color="#000000",
        is_active=True,
        role_id=cashier_role,
    )
    db_session.add(employee)
    db_session.commit()

    shift = Shift(
        date=date(2026, 4, 12),
        start_time=time(10, 0),
        end_time=time(15, 0),
        min_staff_req=1,
        role_id=cashier_role,
    )
    db_session.add(shift)
    db_session.commit()

    payload = {
        "employee_id": employee.id,
        "shift_id": shift.id,
    }

    res = client.post("/api/v1/pickup_requests", json=payload)
    assert res.status_code == 201
    data = res.json()

    assert data["employee_id"] == employee.id
    assert data["shift_id"] == shift.id
    assert data["status"] == "pending"
