from datetime import date, time

from gatorsched_api.models.role import Role
from gatorsched_api.models.shift import Shift


def test_shifts_returns_200(client):
    res = client.get("/api/v1/shifts")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_shifts_returns_one_after_insert(client, db_session):
    role = Role(
        name="Server",
        description="Serves food to customers.",
    )

    db_session.add(role)
    db_session.commit()

    shift = Shift(
        date=date(2026, 3, 2),
        start_time=time(9, 15),
        end_time=time(17, 0),
        min_staff_req=2,
        role_id=role.id,
    )

    db_session.add(shift)
    db_session.commit()

    res = client.get("/api/v1/shifts")

    assert res.status_code == 200
    data = res.json()

    shift = next((s for s in data if s["role_id"] == role.id), None)

    assert shift is not None
    assert shift["min_staff_req"] == 2
    assert shift["start_time"] == "09:15:00"
    assert shift["end_time"] == "17:00:00"

def test_create_shift(client, db_session):
    role = Role (
        name="Sales Assistant",
        description="Helps with selling product to customers.",
    )

    db_session.add(role)
    db_session.commit()

    payload = {
        "date": "2026-03-15",
        "start_time": "09:15:00",
        "end_time": "17:00:00",
        "min_staff_req": 2,
        "role_id": role.id,
    }

    create = client.post("/api/v1/shifts", json=payload)
    assert create.status_code == 201
    post_data = create.json()
    assert post_data["role_id"] == role.id
    assert "id" in post_data

    res = client.get("/api/v1/shifts")
    assert res.status_code == 200
    get_data = res.json()
    assert isinstance(get_data, list)

    shift = next((s for s in get_data if s["id"] == post_data["id"]), None)

    assert shift is not None
    assert shift["min_staff_req"] == payload["min_staff_req"]