from datetime import time

from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.role import Role


def test_availabilities_returns_200(client):
    res = client.get("/api/v1/availabilities")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_availability_returns_one_after_insert(client, db_session):
    role = Role(
        name="Server",
        description="Serves food to customers.",
    )

    db_session.add(role)
    db_session.commit()

    employee = Employee(
        name="Ben Davidson",
        email="ben44@example.com",
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

    ben_availability = next((a for a in data if a["employee_id"] == employee.id), None)

    assert ben_availability is not None
    assert ben_availability["day_of_week"] == 0
    assert ben_availability["employee_id"] == employee.id
