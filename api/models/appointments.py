from pydantic import BaseModel
from typing import Optional
from datetime import date
from datetime import time


class ApptIn(BaseModel):
    user_id: int
    name: str
    email: str
    cancel_url: str
    reschedule_url: str
    service_id: int
    approved: bool
    date: date
    time: time


class ApptOut(BaseModel):
    id: int
    user_id: int
    name: str
    email: str
    cancel_url: str
    reschedule_url: str
    service_id: int
    approved: bool
    date: date
    time: time


class ApptInUpdate(BaseModel):
    approved: Optional[bool]
    date: Optional[date]
    time: Optional[time]
