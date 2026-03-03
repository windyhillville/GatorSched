from fastapi import APIRouter

from .routes.employees import router as employees_router
from .routes.health import router as health_router
from .routes.roles import router as roles_router
from .routes.shifts import router as shifts_router
from .routes.availabilities import router as availabilities_router
from .routes.schedule_assignments import router as schedule_assignments_router
from .routes.swap_requests import router as swap_requests_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(employees_router)
api_router.include_router(roles_router)
api_router.include_router(shifts_router)
api_router.include_router(availabilities_router)
api_router.include_router(schedule_assignments_router)
api_router.include_router(swap_requests_router)