from fastapi.testclient import TestClient
from main import app
from queries.testimonials_queries import TestimonialRepository
from models.testimonials import TestimonialIn, TestimonialOut
from models.users import UserWithPw
from utils.authentication import generate_jwt

client = TestClient(app)


class EmptyTestimonialQueries:
    def get_all(self):
        return []


class SampleTestimonialsQueries(TestimonialRepository):
    def create(self, testimonial: TestimonialIn) -> TestimonialOut:
        return TestimonialOut(
            id=1,
            rating=testimonial.rating,
            name=testimonial.name,
            description=testimonial.description,
            approved=testimonial.approved
        )


def test_create_testimonial():
    app.dependency_overrides[TestimonialRepository] = SampleTestimonialsQueries

    sample_testimonial = {
        "rating": 5,
        "name": "James",
        "description": "testing!",
        "approved": True
    }

    user = UserWithPw(
        username="test_user",
        id=1,
        email="test@example.com",
        password="hashed_password"
    )

    jwt_token = generate_jwt(user)
    client.headers.update({"Authorization": f"Bearer {jwt_token}"})

    response = client.post("/api/testimonials", json=sample_testimonial)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        **sample_testimonial
    }

    app.dependency_overrides = {}
    client.cookies.clear()
