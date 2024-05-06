from main import app
from fastapi.testclient import TestClient
from queries.pet_queries import PetQueries
from models.pets import PetIn, PetOut
from models.users import UserWithPw
from utils.authentication import generate_jwt

client = TestClient(app)


class EmptyPetQueries:
    def get_all_pets(self):
        return []


class SamplePetQueries(PetQueries):
    def create(self, pet: PetIn) -> PetOut:
        return PetOut(
            id=1,
            pet_name=pet.pet_name,
            image_url=pet.image_url,
            for_sale=pet.for_sale,
            price=pet.price,
            breed=pet.breed,
            birthday=pet.birthday,
            description=pet.description,
            owner_id=pet.owner_id
        )


def test_get_all_pets():
    # ARRANGE
    app.dependency_overrides[PetQueries] = EmptyPetQueries

    # ACT
    response = client.get("/api/pets")
    app.dependency_overrides = {}

    # ASSERT
    assert response.status_code == 404
    assert response.json() == {'detail': "Pets not found."}


def test_create_pet():
    # ARRANGE
    app.dependency_overrides[PetQueries] = SamplePetQueries

    sample_pet = {
        "pet_name": "Rover",
        "image_url": "image.com/image.png",
        "for_sale": True,
        "price": 0,
        "breed": "Beagle",
        "birthday": "2024-05-02",
        "description": "This is my beautiful test dog.",
        "owner_id": 1,
    }

    user = UserWithPw(
        username="test_user",
        id=1,
        email="test@example.com",
        password="hashed_password"
    )
    jwt_token = generate_jwt(user)
    client.cookies["fast_api_token"] = jwt_token

    # ACT
    response = client.post("/api/pets", json=sample_pet)

    # ASSERT
    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        **sample_pet
    }

    # CLEAN UP
    app.dependency_overrides = {}
    client.cookies.clear()


def test_create_pet_unauthorized():
    # ARRANGE
    app.dependency_overrides[PetQueries] = SamplePetQueries

    sample_pet = {
        "pet_name": "Rover",
        "image_url": "image.com/image.png",
        "for_sale": True,
        "price": 0,
        "breed": "Beagle",
        "birthday": "2024-05-02",
        "description": "This is my beautiful test dog.",
        "owner_id": 1,
    }

    # ACT
    response = client.post("/api/pets", json=sample_pet)

    # ASSERT
    assert response.status_code == 401

    # CLEAN UP
    app.dependency_overrides = {}
