from pydantic import BaseModel
from typing import Optional


class ServiceIn(BaseModel):
    service: str
    description: str
    picture_url: str
    duration: int
    cost: str
    calendly_url: str


class ServiceOut(BaseModel):
    id: int
    service: str
    description: str
    picture_url: str
    duration: int
    cost: str
    calendly_url: str


class ServiceInUpdate(BaseModel):
    service: Optional[str] = None
    description: Optional[str] = None
    picture_url: Optional[str] = None
    duration: Optional[int] = None
    cost: Optional[str] = None
    calendly_url: Optional[str] = None
