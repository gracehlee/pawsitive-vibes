from pydantic import BaseModel
from typing import Optional


class ServiceIn(BaseModel):
    service: str
    picture_url: str
    duration: int
    cost: str


class ServiceOut(BaseModel):
    id: int
    service: str
    picture_url: str
    duration: int
    cost: str


class ServiceInUpdate(BaseModel):
    service: Optional[str] = None
    picture_url: Optional[str] = None
    duration: Optional[int] = None
    cost: Optional[str] = None
