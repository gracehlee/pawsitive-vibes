from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from models.appointments import ApptIn, ApptOut, ApptInUpdate
from queries.appointment_queries import AppointmentQueries
from utils.authentication import JWTUserData, try_get_jwt_user_data

router = APIRouter(prefix="/api",  tags=["Appointments"])


@router.post("/appointments", response_model=ApptOut, status_code=201)
async def create_appt(
    appt: ApptIn,
    repo: AppointmentQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Log in to add appointments.")
    created_appt = repo.create(appt)
    if not created_appt:
        raise HTTPException(status_code=500,
                            detail="Failed to create appointment")
    return created_appt


@router.get("/appointments", response_model=List[ApptOut])
async def get_all(
    repo: AppointmentQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Log in to view appointments.")
    appointments = repo.get_all()
    if not appointments:
        raise HTTPException(status_code=404, detail="Appointments not found.")
    return appointments


@router.get("/appointments/{appt_id}", response_model=ApptOut)
async def get_appt_by_id(
    appt_id: int,
    repo: AppointmentQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Log in to view appointments.")
    appt = repo.get_one(appt_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


@router.put("/appointments/{appt_id}", response_model=ApptOut)
async def update_appt_by_id(
    appt_id: int,
    appt_update: ApptInUpdate,
    repo: AppointmentQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Log in to update appointments.")
    updated_appt = repo.update(appt_id, appt_update)
    if not updated_appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated_appt


@router.delete("/appointments/{appt_id}")
async def delete_appt_by_id(
    appt_id: int,
    repo: AppointmentQueries = Depends(),
    user: Optional[JWTUserData] = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Log in to delete appointments.")
    success = repo.delete(appt_id)
    if not success:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment deleted successfully"}
