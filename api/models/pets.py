from pydantic import BaseModel
from typing import Optional
from datetime import date


class PetIn(BaseModel):
    pet_name: str
    image_url: str
    for_sale: bool
    price: int
    breed: str
    birthday: date
    description: str
    owner_id: int


class PetInUpdate(BaseModel):
    pet_name: Optional[str] = None
    image_url: Optional[str] = None
    for_sale: Optional[bool] = None
    price: Optional[int] = None
    breed: Optional[str] = None
    birthday: Optional[date] = None
    description: Optional[str] = None
    owner_id: Optional[int] = None


class PetOut(BaseModel):
    id: int
    pet_name: str
    image_url: str
    for_sale: bool
    price: int
    breed: str
    birthday: date
    description: str
    owner_id: int
