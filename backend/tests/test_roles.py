from gatorsched_api.models.role import Role

def test_roles_returns_200(client):
    res = client.get("/api/v1/roles")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

def test_roles_returns_one_after_insert(client, db_session):
    role = Role (
        name="Cashier",
        description="Handles customer checkout."
    )

    db_session.add(role)
    db_session.commit()

    res = client.get("/api/v1/roles")

    assert res.status_code == 200
    data = res.json()

    assert len(data) == 1
    assert data[0]["name"] == "Cashier"
    assert data[0]["description"] == "Handles customer checkout."