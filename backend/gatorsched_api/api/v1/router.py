from fastapi import APIRouter

from .routes.employees import router as employees_router
from .routes.health import router as health_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(employees_router)
