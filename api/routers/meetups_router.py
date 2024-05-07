from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models.meetups import MeetupsIn, MeetupsOut, MeetupsInUpdate
from queries.meetups_queries import MeetupsQueries
from utils.authentication import JWTUserData, try_get_jwt_user_data

router = APIRouter(prefix="/api",  tags=["Meetups"])


@router.post("/meetups", response_model=MeetupsOut, status_code=201)
async def create_meetup(
    meetup: MeetupsIn,
    repo: MeetupsQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may add Meetups.")
    created_meetup = repo.create(meetup)
    if not created_meetup:
        raise HTTPException(status_code=500, detail="Failed to create Meetup")
    return created_meetup


@router.get("/meetups", response_model=List[MeetupsOut])
async def get_all_meetups(
    repo: MeetupsQueries = Depends(),
):
    meetups = repo.get_all_meetups()
    if not meetups:
        raise HTTPException(status_code=404, detail="Meetups not found.")
    return meetups


@router.get("/meetups/{meetup_id}", response_model=MeetupsOut)
async def get_meetup_by_id(
    meetup_id: int,
    repo: MeetupsQueries = Depends(),
):
    meetup = repo.get_one(meetup_id)
    if not meetup:
        raise HTTPException(status_code=404, detail="Meetup not found")
    return meetup


@router.put("/meetups/{meetup_id}", response_model=MeetupsOut)
async def update_meetup_by_id(
    meetup_id: int,
    meetup_update: MeetupsInUpdate,
    repo: MeetupsQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may update Meetups.")
    updated_meetup = repo.update(meetup_id, meetup_update)
    if not updated_meetup:
        raise HTTPException(status_code=404, detail="Meetup not found")
    return updated_meetup


@router.delete("/meetups/{meetup_id}")
async def delete_meetup_by_id(
    meetup_id: int,
    repo: MeetupsQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may delete meetups.")
    success = repo.delete(meetup_id)
    if not success:
        raise HTTPException(status_code=404, detail="Meetup not found")
    return {"message": "Meetup deleted successfully"}
