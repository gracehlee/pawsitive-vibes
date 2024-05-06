from fastapi.testclient import TestClient
from main import app
from queries.service_queries import ServiceRepository

client = TestClient(app)


class EmptyServiceQueries:
    def get_all(self):
        return []


def test_get_all_services():
    # ARRAGNE
    app.dependency_overrides[ServiceRepository] = EmptyServiceQueries

    # ACT
    response = client.get("/api/services")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': 'Services not found.'}
