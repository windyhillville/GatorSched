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


def test_create_employee(client):
    payload = {
        "name": "Johnny Boy",
        "email": "johnny@example.com",
        "phone": "098-765-4321",
        "max_weekly_hours": 40,
        "access_level": "employee",
        "is_active": True,
    }
    create = client.post("/api/v1/employees", json=payload)
    assert create.status_code == 201
    post_data = create.json()
    assert post_data["email"] == payload["email"]
    assert "id" in post_data

    res = client.get("/api/v1/employees")
    assert res.status_code == 200
    get_data = res.json()
    assert isinstance(get_data, list)

    johnny = next((e for e in get_data if e["email"] == payload["email"]), None)

    assert johnny is not None
    assert johnny["name"] == payload["name"]
    assert johnny["access_level"] == payload["access_level"]
