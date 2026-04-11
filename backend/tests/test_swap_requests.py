from datetime import date, time

from gatorsched_api.models.employee import AccessLevel, Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus


def create_employee(db_session, role_id: int, name: str, email: str) -> Employee:
    employee = Employee(
        name=name,
        email=email,
        color="#343456",
        access_level=AccessLevel.employee,
        is_active=True,
        role_id=role_id,
    )
    db_session.add(employee)
    db_session.commit()
    db_session.refresh(employee)
    return employee


def create_shift(db_session, role_id: int, shift_date: date) -> Shift:
    shift = Shift(
        date=shift_date,
        start_time=time(9, 0),
        end_time=time(17, 0),
        min_staff_req=2,
        role_id=role_id,
    )
    db_session.add(shift)
    db_session.commit()
    db_session.refresh(shift)
    return shift


def create_assignment(db_session, employee_id: int, shift_id: int) -> ScheduleAssignment:
    assignment = ScheduleAssignment(
        employee_id=employee_id,
        shift_id=shift_id,
        status="assigned",
    )
    db_session.add(assignment)
    db_session.commit()
    db_session.refresh(assignment)
    return assignment


def test_swap_requests_returns_200(client):
    res = client.get("/api/v1/swap_requests")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_swap_requests_returns_one_after_insert(client, db_session, cashier_role):
    requester = create_employee(db_session, cashier_role, "Ben Davidson", "ben33@example.com")
    cover = create_employee(db_session, cashier_role, "Dom Consiglio", "dom33@example.com")

    requester_shift = create_shift(db_session, cashier_role, date(2026, 3, 2))
    cover_shift = create_shift(db_session, cashier_role, date(2026, 3, 3))

    requester_assignment = create_assignment(db_session, requester.id, requester_shift.id)
    cover_assignment = create_assignment(db_session, cover.id, cover_shift.id)

    swap = SwapRequest(
        requester_id=requester.id,
        cover_id=cover.id,
        requester_assignment_id=requester_assignment.id,
        cover_assignment_id=cover_assignment.id,
        employee_status=EmployeeRequestStatus.pending,
        manager_status=ManagerRequestStatus.not_sent,
    )

    db_session.add(swap)
    db_session.commit()
    db_session.refresh(swap)

    res = client.get("/api/v1/swap_requests")
    assert res.status_code == 200
    data = res.json()

    request = next((r for r in data if r["id"] == swap.id), None)

    assert request is not None
    assert request["requester_id"] == requester.id
    assert request["cover_id"] == cover.id
    assert request["requester_assignment_id"] == requester_assignment.id
    assert request["cover_assignment_id"] == cover_assignment.id
    assert request["employee_status"] == EmployeeRequestStatus.pending
    assert request["manager_status"] == ManagerRequestStatus.not_sent


def test_create_swap_request(client, db_session, cashier_role):
    requester = create_employee(db_session, cashier_role, "John Smith", "john2@example.com")
    cover = create_employee(db_session, cashier_role, "Jane Doe", "jane2@example.com")

    requester_shift = create_shift(db_session, cashier_role, date(2026, 3, 4))
    cover_shift = create_shift(db_session, cashier_role, date(2026, 3, 5))

    requester_assignment = create_assignment(db_session, requester.id, requester_shift.id)
    cover_assignment = create_assignment(db_session, cover.id, cover_shift.id)

    payload = {
        "requester_id": requester.id,
        "cover_id": cover.id,
        "requester_assignment_id": requester_assignment.id,
        "cover_assignment_id": cover_assignment.id,
        "employee_status": EmployeeRequestStatus.pending,
        "manager_status": ManagerRequestStatus.not_sent,
    }

    create = client.post("/api/v1/swap_requests", json=payload)
    assert create.status_code == 201
    post_data = create.json()

    assert post_data["requester_id"] == requester.id
    assert post_data["cover_id"] == cover.id
    assert post_data["requester_assignment_id"] == requester_assignment.id
    assert post_data["cover_assignment_id"] == cover_assignment.id
    assert "id" in post_data

    res = client.get("/api/v1/swap_requests")
    assert res.status_code == 200
    get_data = res.json()
    assert isinstance(get_data, list)

    swap = next((s for s in get_data if s["id"] == post_data["id"]), None)

    assert swap is not None
    assert swap["requester_assignment_id"] == payload["requester_assignment_id"]
    assert swap["cover_assignment_id"] == payload["cover_assignment_id"]
    assert swap["employee_status"] == EmployeeRequestStatus.pending
    assert swap["manager_status"] == ManagerRequestStatus.not_sent
