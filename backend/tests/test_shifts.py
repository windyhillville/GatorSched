from gatorsched_api.models.shift import Shift
from datetime import date, time

def test_shifts_returns_200(client):
    res = client.get("/api/v1/shifts")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_employees_returns_one_after_insert(client, db_session):
    shift = Shift(
        date=date(2026, 3, 2),
        start_time=time(9,0),
        end_time=time(17,0),
        min_staff_req=2,
    )

    db_session.add(shift)
    db_session.commit()

    res = client.get("/api/v1/shifts")

    assert res.status_code == 200
    data = res.json()

    assert len(data) == 1
    assert data[0]["min_staff_req"] == 2