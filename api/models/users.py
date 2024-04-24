"""
Pydantic Models for Users.
"""
from pydantic import BaseModel
from typing import Optional


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """
    id: int
    username: str
    password: str


class UserInUpdate(BaseModel):
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    bio: Optional[str]


class UserOut(BaseModel):
    id: int
    username: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[int]
    bio: Optional[str]


class UserNew(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str
    phone_number: int
    bio: Optional[str]
