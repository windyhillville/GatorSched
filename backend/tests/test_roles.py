from gatorsched_api.models.role import Role


def test_roles_returns_200(client):
    res = client.get("/api/v1/roles")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_roles_returns_one_after_insert(client, db_session):
    role = Role(name="Stocker", description="Stocks shelves.")

    db_session.add(role)
    db_session.commit()

    res = client.get("/api/v1/roles")

    assert res.status_code == 200
    data = res.json()

    cashier = next((r for r in data if r["name"] == "Stocker"), None)

    assert cashier is not None
    assert cashier["name"] == "Stocker"
    assert cashier["description"] == "Stocks shelves."


def test_create_role(client):
    payload = {
        "name": "Manager",
        "description": "Manages the store.",
    }

    create = client.post("/api/v1/roles", json=payload)
    assert create.status_code == 201
    post_data = create.json()
    assert post_data["name"] == "Manager"
    assert "id" in post_data

    res = client.get("/api/v1/roles")
    assert res.status_code == 200
    get_data = res.json()
    assert isinstance(get_data, list)

    role = next((r for r in get_data if r["name"] == payload["name"]), None)

    assert role is not None
    assert role["description"] == payload["description"]
