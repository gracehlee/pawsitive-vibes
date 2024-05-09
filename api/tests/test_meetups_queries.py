from main import app
from fastapi.testclient import TestClient
from queries.meetups_queries import MeetupsQueries
from models.meetups import MeetupsIn, MeetupsOut
from models.users import UserWithPw
from utils.authentication import generate_jwt

client = TestClient(app)


class EmptyMeetupsQueries:
    def get_all_meetups(self):
        return []


class SampleMeetupsQueries(MeetupsQueries):
    def create(self, meetup: MeetupsIn) -> MeetupsOut:
        return MeetupsOut(
            id=1,
            name=meetup.name,
            date=meetup.date,
            time=meetup.time,
            description=meetup.description,
            location=meetup.location
        )


def test_get_all_meetups():
    # ARRANGE
    app.dependency_overrides[MeetupsQueries] = EmptyMeetupsQueries

    # ACT
    response = client.get("/api/meetups")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': "Meetups not found."}


def test_create_meetup():
    # ARRANGE
    app.dependency_overrides[MeetupsQueries] = SampleMeetupsQueries

    sample_meetup = {
        "name": "Walk in the park",
        "date": "2024-05-09",
        "time": "13:55:00",
        "description": "Walk around Memorial Park",
        "location": "Memorial Park"
    }

    user = UserWithPw(
        username="user",
        id=1,
        email="user@test.com",
        password="hashed_password"
    )
    jwt_token = generate_jwt(user)
    client.cookies["fast_api_token"] = jwt_token

    # ACT
    response = client.post("/api/meetups", json=sample_meetup)

    # ASSERT
    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        **sample_meetup
    }

    # CLEAN UP
    app.dependency_overrides = {}
    client.cookies.clear()


def test_create_meetup_unauthorized():
    # ARRANGE
    app.dependency_overrides[MeetupsQueries] = SampleMeetupsQueries

    sample_meetup = {
        "name": "Walk in the park",
        "date": "2024-05-09",
        "time": "13:55:00",
        "description": "Walk around Memorial Park",
        "location": "Memorial Park"
    }

    # ACT
    response = client.post("/api/meetups", json=sample_meetup)

    # ASSERT
    assert response.status_code == 401

    # CLEAN UP
    app.dependency_overrides = {}
