from datetime import time

import pytest

from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import AccessLevel, Employee


def test_availabilities_returns_200(client):
    res = client.get("/api/v1/availabilities")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_availability_returns_one_after_insert(client, db_session, cashier_role):
    employee = Employee(
        name="Ben Davidson",
        email="ben44@example.com",
        password_hash=pytest.dummy_hash,
        color="#456785",
        access_level=AccessLevel.manager,
        is_active=True,
        role_id=cashier_role,
    )

    db_session.add(employee)
    db_session.commit()

    availability = Availability(
        employee_id=employee.id,
        day_of_week=0,
        start_time=time(8, 30),
        end_time=time(17, 30),
    )

    db_session.add(availability)
    db_session.commit()

    res = client.get("/api/v1/availabilities")
    assert res.status_code == 200
    data = res.json()

    ben_availability = next((a for a in data if a["employee_id"] == employee.id), None)

    assert ben_availability is not None
    assert ben_availability["day_of_week"] == 0
    assert ben_availability["employee_id"] == employee.id


def test_create_availability(client, db_session, cashier_role):
    employee = Employee(
        name="John Smith",
        email="john3@example.com",
        password_hash=pytest.dummy_hash,
        color="#343434",
        access_level=AccessLevel.employee,
        is_active=True,
        role_id=cashier_role,
    )

    db_session.add(employee)
    db_session.commit()

    payload = {
        "employee_id": employee.id,
        "day_of_week": 1,
        "start_time": "08:30:00",
        "end_time": "17:30:00",
    }

    create = client.post("/api/v1/availabilities", json=payload)
    assert create.status_code == 201
    post_data = create.json()
    assert post_data["employee_id"] == employee.id
    assert "id" in post_data

    res = client.get("/api/v1/availabilities")
    assert res.status_code == 200
    get_data = res.json()
    assert isinstance(get_data, list)

    availability = next((s for s in get_data if s["id"] == post_data["id"]), None)

    assert availability is not None
    assert availability["day_of_week"] == payload["day_of_week"]
