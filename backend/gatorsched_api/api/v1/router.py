from fastapi import APIRouter

from .routes.employee.requests import router as requests_router
from .routes.employee.schedule import router as employee_schedule_router
from .routes.employee.scheduler import router as scheduler_router
from .routes.employee.teams import router as teams_router
from .routes.entities.availabilities import router as availabilities_router
from .routes.entities.employees import router as employees_router
from .routes.entities.health import router as health_router
from .routes.entities.roles import router as roles_router
from .routes.entities.schedule_assignments import router as schedule_assignments_router
from .routes.entities.shifts import router as shifts_router
from .routes.entities.swap_requests import router as swap_requests_router
from .routes.entities.callout_requests import router as callout_requests_router
from .routes.entities.pickup_requests import router as pickup_requests_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(employees_router)
api_router.include_router(roles_router)
api_router.include_router(shifts_router)
api_router.include_router(availabilities_router)
api_router.include_router(schedule_assignments_router)
api_router.include_router(swap_requests_router)
api_router.include_router(scheduler_router)
api_router.include_router(teams_router)
api_router.include_router(requests_router)
api_router.include_router(employee_schedule_router)
api_router.include_router(callout_requests_router)
api_router.include_router(pickup_requests_router)
