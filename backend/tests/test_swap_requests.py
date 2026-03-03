from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.models.employee import Employee, AccessLevel
from gatorsched_api.models.role import Role
from datetime import time, date


def test_swap_requests_returns_200(client):
    res = client.get("/api/v1/swap_requests")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_request_swaps_returns_one_after_insert(client, db_session):
    role = Role (
        name="Cook",
        description="Cooks meals.",
    )

    db_session.add(role)
    db_session.commit()

    requester = Employee(
        name="Ben Davidson",
        email="ben33@example.com",
        access_level=AccessLevel.employee,
        is_active=True,
        role_id=role.id,
    )

    db_session.add(requester)
    db_session.commit()

    shift = Shift (
        date=date(2026, 3, 2),
        start_time=time(9,0),
        end_time=time(17,0),
        min_staff_req=2,
        role_id=role.id,
    )

    db_session.add(shift)
    db_session.commit()

    assignment = ScheduleAssignment (
        employee_id=requester.id,
        shift_id=shift.id,
        status="assigned",
    )

    db_session.add(assignment)
    db_session.commit()

    swap = SwapRequest (
        requester_id=requester.id,
        cover_id=None,
        schedule_assignment_id=assignment.id,
        status="pending",
    )

    db_session.add(swap)
    db_session.commit()

    res = client.get("/api/v1/swap_requests")
    assert res.status_code == 200
    data = res.json()

    request = next((r for r in data if r["schedule_assignment_id"] == assignment.id), None)

    assert request is not None
    assert request["requester_id"] == requester.id
    assert request["status"] == "pending"