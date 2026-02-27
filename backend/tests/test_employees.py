def test_employees_returns_200(client):
    res = client.get("/api/v1/employees")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
