from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from utils.authentication import JWTUserData, try_get_jwt_user_data
from models.testimonials import (
    TestimonialIn,
    TestimonialOut,
    TestimonialInUpdate
)
from queries.testimonials_queries import TestimonialRepository

router = APIRouter(prefix="/api", tags=["Testimonials"])


@router.post("/testimonials", response_model=TestimonialOut)
async def create_testimonial(
    testimonial: TestimonialIn,
    repo: TestimonialRepository = Depends()
):
    return repo.create(testimonial)


@router.get("/testimonials", response_model=List[TestimonialOut])
async def get_all_testimonials(
    repo: TestimonialRepository = Depends(),
):
    return repo.get_all()


@router.get(
    "/testimonials/{testimonial_id}",
    response_model=TestimonialOut
)
async def get_testimonial_by_id(
    testimonial_id: int,
    repo: TestimonialRepository = Depends()
):
    return repo.get_one(testimonial_id)


@router.put(
    "/testimonials/{testimonial_id}",
    response_model=TestimonialOut
)
async def update_testimonial_by_id(
    testimonial_id: int,
    testimonial_update: TestimonialInUpdate,
    repo: TestimonialRepository = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Only logged-in users may update testimonials."
        )
    updated_testimonial = repo.update(testimonial_id, testimonial_update)
    if not updated_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return updated_testimonial


@router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial_by_id(
    testimonial_id: int,
    repo: TestimonialRepository = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data),
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Only logged-in users may delete testimonials."
        )
    success = repo.delete(testimonial_id)
    if not success:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}
