from pydantic import BaseModel
from typing import Optional


class TestimonialIn(BaseModel):
    rating: int
    name: str
    description: str
    approved: bool = False


class TestimonialOut(BaseModel):
    id: int
    rating: int
    name: str
    description: str
    approved: bool = False


class TestimonialInUpdate(BaseModel):
    rating: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    approved: Optional[bool] = False
