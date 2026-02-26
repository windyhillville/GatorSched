from fastapi.testclient import TestClient

from gatorsched_api.main import app


def test_health_returns_200():
    client = TestClient(app)
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}
