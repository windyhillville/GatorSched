from datetime import date, time

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.role import Role
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift


def test_schedule_assignments_returns_200(client):
    res = client.get("/api/v1/schedule_assignments")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_schedule_assignments_returns_one_after_insert(client, db_session):
    role = Role(
        name="Sales Associate",
        description="Sells products to customers.",
    )

    db_session.add(role)
    db_session.commit()

    employee = Employee(
        name="Ben Davidson",
        email="ben11@example.com",
        access_level=AccessLevel.manager,
        is_active=True,
        role_id=role.id,
    )

    db_session.add(employee)
    db_session.commit()

    shift = Shift(
        date=date(2026, 3, 2),
        start_time=time(9, 0),
        end_time=time(17, 0),
        min_staff_req=2,
        role_id=role.id,
    )

    db_session.add(shift)
    db_session.commit()

    assignment = ScheduleAssignment(
        employee_id=employee.id,
        shift_id=shift.id,
        status="assigned",
    )

    db_session.add(assignment)
    db_session.commit()

    res = client.get("/api/v1/schedule_assignments")
    assert res.status_code == 200
    data = res.json()

    sched_assignment = next((a for a in data if a["employee_id"] == employee.id), None)

    assert sched_assignment is not None
    assert sched_assignment["shift_id"] == shift.id
    assert sched_assignment["status"] == "assigned"
