from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models.pets import PetIn, PetOut, PetInUpdate
from queries.pet_queries import PetQueries
from utils.authentication import JWTUserData, try_get_jwt_user_data

router = APIRouter(prefix="/api",  tags=["Pets"])


@router.post("/pets", response_model=PetOut, status_code=201)
async def create_pet(
    pet: PetIn,
    repo: PetQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may add pets.")
    created_pet = repo.create(pet)
    if not created_pet:
        raise HTTPException(status_code=500, detail="Failed to create pet")
    return created_pet


@router.get("/pets", response_model=List[PetOut])
async def get_all_pets(
    repo: PetQueries = Depends(),
):
    pets = repo.get_all_pets()
    if not pets:
        raise HTTPException(status_code=404, detail="Pets not found.")
    return pets


@router.get("/pets/{pet_id}", response_model=PetOut)
async def get_pet_by_id(
    pet_id: int,
    repo: PetQueries = Depends(),
):
    pet = repo.get_one(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet


@router.put("/pets/{pet_id}", response_model=PetOut)
async def update_pet_by_id(
    pet_id: int,
    pet_update: PetInUpdate,
    repo: PetQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may update pets.")
    updated_pet = repo.update(pet_id, pet_update)
    if not updated_pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return updated_pet


@router.delete("/pets/{pet_id}")
async def delete_pet_by_id(
    pet_id: int,
    repo: PetQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Only logged-in users may delete pets.")
    success = repo.delete(pet_id)
    if not success:
        raise HTTPException(status_code=404, detail="Pet not found")
    return {"message": "Pet deleted successfully"}
