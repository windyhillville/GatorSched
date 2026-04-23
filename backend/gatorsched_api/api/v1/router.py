from fastapi import APIRouter

from .routes.employee.accept_swap import router as accept_swap_router
from .routes.employee.availability import router as employee_availabilities_router
from .routes.employee.cancel_swap import router as cancel_swap_router
from .routes.employee.create_swap_request import router as create_swap_request_router
from .routes.employee.decline_swap import router as decline_swap_router
from .routes.employee.profile_screen import router as profile_screen_router
from .routes.employee.render_swap_request_info import router as render_swap_request
from .routes.employee.requests import router as requests_router
from .routes.employee.schedule import router as employee_schedule_router
from .routes.employee.set_availability import router as set_availability_router
from .routes.entities.availabilities import router as availabilities_router
from .routes.entities.callout_requests import router as callout_requests_router
from .routes.entities.employees import router as employees_router
from .routes.entities.health import router as health_router
from .routes.entities.pickup_requests import router as pickup_requests_router
from .routes.entities.roles import router as roles_router
from .routes.entities.schedule_assignments import router as schedule_assignments_router
from .routes.entities.shifts import router as shifts_router
from .routes.entities.swap_requests import router as swap_requests_router
from .routes.manager.approve_swap import router as approve_swap_router
from .routes.manager.reject_swap import router as reject_swap_router
from .routes.manager.requests import router as manager_requests_router
from .routes.manager.scheduler.render_schedule import router as scheduled_router
from .routes.manager.scheduler.scheduler import router as scheduler_router
from .routes.manager.shifts.create_shift import router as create_shift_router
from .routes.manager.shifts.edit_shift import router as edit_shift_router
from .routes.manager.shifts.manage_assignment import router as manage_assignment_router
from .routes.manager.shifts.render_shifts import router as render_shifts_router
from .routes.manager.teams import router as teams_router

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
api_router.include_router(employee_availabilities_router)
api_router.include_router(set_availability_router)
api_router.include_router(manager_requests_router)
api_router.include_router(render_shifts_router)
api_router.include_router(edit_shift_router)
api_router.include_router(create_shift_router)
api_router.include_router(scheduled_router)
api_router.include_router(manage_assignment_router)
api_router.include_router(render_swap_request)
api_router.include_router(create_swap_request_router)
api_router.include_router(accept_swap_router)
api_router.include_router(decline_swap_router)
api_router.include_router(cancel_swap_router)
api_router.include_router(approve_swap_router)
api_router.include_router(reject_swap_router)
api_router.include_router(profile_screen_router)
