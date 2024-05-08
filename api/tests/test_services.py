from fastapi.testclient import TestClient
from main import app
from models.services import ServiceIn, ServiceOut
from models.users import UserWithPw
from utils.authentication import generate_jwt
from queries.service_queries import ServiceRepository

client = TestClient(app)


class EmptyServiceQueries:
    def get_all(self):
        return []


class SampleServiceQueries(ServiceRepository):
    def create(self, service: ServiceIn) -> ServiceOut:
        return ServiceOut(
            id=1,
            service=service.service,
            description=service.description,
            picture_url=service.picture_url,
            duration=service.duration,
            cost=service.cost,
            calendly_url=service.calendly_url
        )


def test_get_all_services():
    # ARRAGNE
    app.dependency_overrides[ServiceRepository] = EmptyServiceQueries

    # ACT
    response = client.get("/api/services")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': 'Services not found.'}


def test_create_service():
    app.dependency_overrides[ServiceRepository] = SampleServiceQueries

    sample_service = {
        "service": "test",
        "description": "this is a test",
        "picture_url": "test.com",
        "duration": 1,
        "cost": "$test",
        "calendly_url": "wowwhatagreattest.com",
    }

    user = UserWithPw(
        username="MrTest",
        id=1,
        email="test@test.com",
        password="hashed_password"
    )
    jwt_token = generate_jwt(user)
    client.cookies["fast_api_token"] = jwt_token

    response = client.post("/api/services", json=sample_service)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        **sample_service
    }

    app.dependency_overrides = {}
    client.cookies.clear()


def test_create_service_unauthorized():

    app.dependency_overrides[ServiceRepository] = SampleServiceQueries

    sample_service = {
        "service": "test",
        "description": "this is a test",
        "picture_url": "test.com",
        "duration": 1,
        "cost": "$test",
        "calendly_url": "wowwhatagreattest.com",
    }

    response = client.post("/api/services", json=sample_service)

    assert response.status_code == 401
    app.dependency_overrides = {}
