from pydantic import BaseModel
from typing import Optional
from datetime import date
from datetime import time


class MeetupsIn(BaseModel):
    name: str
    date: date
    time: time
    description: str
    location: str


class MeetupsInUpdate(BaseModel):
    name: Optional[str]
    date: Optional[date]
    time: Optional[time]
    description: Optional[str]
    location: Optional[str]


class MeetupsOut(BaseModel):
    id: int
    name: str
    date: date
    time: time
    description: str
    location: str
