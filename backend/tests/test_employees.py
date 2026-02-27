from gatorsched_api.models.employee import AccessLevel, Employee


def test_employees_returns_200(client):
    res = client.get("/api/v1/employees")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_employees_returns_one_after_insert(client, db_session):
    employee = Employee(
        name="Ben Davidson",
        email="ben@example.com",
        phone="123-456-7890",
        max_weekly_hours=40,
        access_level=AccessLevel.manager,
        is_active=True,
    )

    db_session.add(employee)
    db_session.commit()

    res = client.get("/api/v1/employees")

    assert res.status_code == 200
    data = res.json()

    assert len(data) == 1
    assert data[0]["name"] == "Ben Davidson"
    assert data[0]["email"] == "ben@example.com"
    assert data[0]["access_level"] == AccessLevel.manager
