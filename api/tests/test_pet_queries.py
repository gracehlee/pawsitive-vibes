from main import app
from fastapi.testclient import TestClient  # type: ignore
from queries.pet_queries import PetQueries

client = TestClient(app)


class EmptyPetQueries:
    def get_all_pets(self):
        return []


def test_get_all_pets():
    # ARRANGE
    app.dependency_overrides[PetQueries] = EmptyPetQueries

    # ACT
    response = client.get("/api/pets")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': "Pets not found."}
