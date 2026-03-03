from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import Employee, AccessLevel
from gatorsched_api.models.role import Role
from datetime import time


def test_availabilities_returns_200(client):
    res = client.get("/api/v1/availabilities")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_availability_returns_one_after_insert(client, db_session):
    role = Role (
        name="Cashier",
        description="Handles customer checkout.",
    )

    db_session.add(role)
    db_session.commit()

    employee = Employee(
        name="Ben Davidson",
        email="ben@example.com",
        access_level=AccessLevel.manager,
        is_active=True,
        role_id=role.id,
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

    assert len(data) == 1
    assert data[0]["day_of_week"] == 0
    assert data[0]["employee_id"] == employee.id