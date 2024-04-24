"""
Users API Router
Get all, get one, update, delete users
"""

from fastapi import APIRouter, Depends, HTTPException

from queries.user_queries import UserQueries
from models.users import UserInUpdate, UserOut
from typing import List
from utils.authentication import (
    JWTUserData,
    try_get_jwt_user_data,
)


router = APIRouter(prefix="", tags=["Users"])


@router.get("/api/users", response_model=List[UserOut])
async def get_all_users(
    repo: UserQueries = Depends(),
    current_user: JWTUserData = Depends(try_get_jwt_user_data)
):
    if not current_user:
        raise HTTPException(status_code=400, detail="Unauthorized")
    users = repo.get_all()
    if not users:
        raise HTTPException(status_code=404, detail="Users not found.")
    return users


@router.get("/api/users/{id}", response_model=UserOut)
async def get_user_by_id(
    id: int,
    repo: UserQueries = Depends(),
    current_user: JWTUserData = Depends(try_get_jwt_user_data)
):
    if not current_user:
        raise HTTPException(status_code=400, detail="Unauthorized")
    user = repo.get_one(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/api/users/{id}", response_model=UserOut)
async def update_user_by_id(
    id: int,
    user_update: UserInUpdate,
    repo: UserQueries = Depends(),
    current_user: JWTUserData = Depends(try_get_jwt_user_data)
):
    if not current_user:
        raise HTTPException(status_code=400, detail="Unauthorized")
    updated_user = repo.update(id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="user not found")
    return updated_user


@router.delete("/users/{id}")
async def delete_user_by_id(
    id: int,
    repo: UserQueries = Depends(),
    current_user: JWTUserData = Depends(try_get_jwt_user_data)
):
    if not current_user:
        raise HTTPException(status_code=400, detail="Unauthorized")
    success = repo.delete(id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}
