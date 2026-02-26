from importlib.metadata import version

from fastapi.testclient import TestClient

from gatorsched_api.core.config import APP_NAME
from gatorsched_api.main import app


def test_version_returns_200():
    client = TestClient(app)
    res = client.get("/api/v1/version")
    assert res.status_code == 200
    assert res.json() == {"name": APP_NAME, "version": version(APP_NAME)}
