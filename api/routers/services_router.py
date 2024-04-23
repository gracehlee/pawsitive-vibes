from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from queries.service_queries import ServiceRepository
from utils.authentication import JWTUserData, try_get_jwt_user_data
from models.services import ServiceIn, ServiceInUpdate, ServiceOut

router = APIRouter(prefix="", tags=["Services"])


@router.post("/api/services", response_model=ServiceOut)
def create_service(
    service: ServiceIn,
    repo: ServiceRepository = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only logged-in users may create new services.")
    created_service = repo.create(service)
    if not created_service:
        raise HTTPException(status_code=500, detail="Failed to create service")
    return created_service


@router.get("/api/services", response_model=List[ServiceOut])
def get_all_services(
    repo: ServiceRepository = Depends()
):
    return repo.get_all()

@router.get("/api/services/{service_id}", response_model=ServiceOut)
def get_service_by_id(
    service_id: int,
    repo: ServiceRepository = Depends()
):
    return repo.get_one(service_id)

@router.put("/api/services/{service_id}", response_model=ServiceOut)
def update_service_by_id(
    service_id: int,
    service_update: ServiceInUpdate,
    repo: ServiceRepository = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only logged-in users may update services.")
    updated_service = repo.update(service_id, service_update)
    if not updated_service:
        raise HTTPException(status_code=404, detail="Service not found")
    return updated_service


@router.delete("/api/services/{service_id}")
def delete_service_by_id(
    service_id: int,
    repo: ServiceRepository = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data),
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Only logged-in users may delete services.")
    success = repo.delete(service_id)
    if not success:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}