from datetime import date, time

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift

def test_callout_requests_returns_200(client):
    res = client.get("/api/v1/callout_requests")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_create_callout_request(client, db_session, cashier_role):
    employee = Employee(
        name = "Callout Test",
        email="callout@example.com",
        access_level=AccessLevel.employee,
        color="#000000",
        is_active = True,
        role_id=cashier_role,
    )
    db_session.add(employee)
    db_session.commit()

    shift = Shift(
        date=date(2026,4, 5),
        start_time=time(9, 0),
        end_time=time(18, 0),
        min_staff_req=1,
        role_id=cashier_role,
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

    payload = {
        "employee_id": employee.id,
        "assignment_id": assignment.id,
        "reason": "Sick day.",
    }

    res = client.post("/api/v1/callout_requests", json=payload)
    assert res.status_code == 201
    data = res.json()

    assert data["employee_id"] == employee.id
    assert data["assignment_id"] == assignment.id
    assert data["status"] == "pending"