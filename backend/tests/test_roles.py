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
