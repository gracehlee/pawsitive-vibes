"""
Entry point for the FastAPI Application
"""
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from routers import (
    auth_router,
    pets_router,
    users_router,
    services_router,
    testimonials_router,
    appointment_router,
    meetups_router,
)
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(pets_router.router)
app.include_router(services_router.router)
app.include_router(appointment_router.router)
app.include_router(testimonials_router.router)
app.include_router(meetups_router.router)


UPLOAD_DIR = Path('static/profile_images')


@app.post('/upload/')
async def upload_file(file_upload: UploadFile, filename: str = Form(...)):
    data = await file_upload.read()
    save_to = UPLOAD_DIR / filename
    # delete old pic if it exists
    if save_to.is_file():
        os.remove(save_to)
    # add new profile pic with format user_id.png
    with open(save_to, 'wb') as f:
        f.write(data)

    return {'filename': filename}


@app.get('/profile_image/{id}')
async def get_profile_image(id: int):
    image_path = UPLOAD_DIR / f"{id}.png"
    if not image_path.is_file():
        return {"error": "Profile image not found"}

    return FileResponse(str(image_path), media_type='image/png')


@app.get('/service_image/{id}')
async def get_service_image(id: int):
    image_path = UPLOAD_DIR / f"{id}.png"
    if not image_path.is_file():
        return {"error": "Service image not found"}

    return FileResponse(str(image_path), media_type='image/png')
