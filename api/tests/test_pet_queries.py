from main import app
from fastapi.testclient import TestClient  # type: ignore
from queries.pet_queries import PetQueries
from models.pets import PetIn, PetOut

client = TestClient(app)


class EmptyPetQueries:
    def get_all_pets(self):
        return []


class SamplePetQueries(PetQueries):
    def create(self, pet: PetIn) -> PetOut:
        return PetOut(**pet, id=1)


def test_get_all_pets():
    # ARRANGE
    app.dependency_overrides[PetQueries] = EmptyPetQueries

    # ACT
    response = client.get("/api/pets")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': "Pets not found."}

# DRAFT

# def test_create_pet():
#     app.dependency_overrides[PetQueries] = SamplePetQueries

#     sample_pet = {
#         "pet_name": "Rover",
#         "image_url": "image.com/image.png",
#         "for_sale": True,
#         "price": 0,
#         "breed": "Beagle",
#         "birthday": "2024-05-02",
#         "description": "This is my beautiful test dog.",
#         "owner_id": 1
#     }

#     response = client.post("/api/pets", json=sample_pet)

#     assert response.status_code == 201
#     assert response.json() == {
#         "id": 1,
#         **sample_pet
#     }

#     app.dependency_overrides = {}
