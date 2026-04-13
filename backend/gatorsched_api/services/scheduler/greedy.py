from datetime import date, time, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.callout_request import CallOutRequest
from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment

# from gatorsched_api.models.availability import Availability
from gatorsched_api.models.shift import Shift
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.schemas.manager.scheduler.scheduler import (
    GenerateScheduleResponse,
    RoleGroup,
    ScheduledShift, DaySchedule,
)
from gatorsched_api.services.datetime_formatting import format_time_label, get_shift_duration_hours

# from gatorsched_api.models.role import Role

## NOTE: Temporary fix until we add a "color" attribute to our Employee entity
EMPLOYEE_COLORS = {
    "Benjamin Davidson": "lightblue",
    "Dominick Consiglio": "lightgreen",
    "Daniel Moody": "skyblue",
    "Ron Don": "lightpink",
    "Johnny Johnson": "peachpuff",
}


def get_employee_color(employee: Employee) -> str:
    return EMPLOYEE_COLORS.get(employee.name, "lightblue")


def generate_schedule_for_week(db: Session, date: date) -> GenerateScheduleResponse:
    print("SCHEDULER FUNCTION EXECUTED")
    week_end = date + timedelta(days=6)
    employeeStmt = (
        select(Employee)
        .where(Employee.is_active)
        .options(joinedload(Employee.role))
        .options(joinedload(Employee.availabilities))
        .order_by(Employee.name)
    )
    employees = db.scalars(employeeStmt).unique().all()
    shift_stmt = (
        select(Shift)
        .where(Shift.date >= date, Shift.date <= week_end)
        .options(joinedload(Shift.role))
        .order_by(Shift.date, Shift.start_time)
    )
    shifts = db.scalars(shift_stmt).unique().all()

    try:
        if shifts:
            shift_ids = [s.id for s in shifts]
            existing = db.scalars(
                select(ScheduleAssignment).where(ScheduleAssignment.shift_id.in_(shift_ids))
            ).all()

            assignment_ids = [a.id for a in existing]
            if assignment_ids:
                for sr in db.scalars(
                        select(SwapRequest).where(
                            SwapRequest.requester_assignment_id.in_(assignment_ids)
                            | SwapRequest.cover_assignment_id.in_(assignment_ids)
                        )
                    ).all():
                        db.delete(sr)
                for cr in db.scalars(
                    select(CallOutRequest).where(
                        CallOutRequest.assignment_id.in_(assignment_ids)
                    )
                ).all():
                    db.delete(cr)

            for assignment in existing:
                db.delete(assignment)

            db.flush()

        days_by_date: dict[date, dict[str, list[ScheduledShift]]] = {}
        previous_shift: dict[int, time] = {}
        hours_assigned: dict[int, float] = {}
        current_date = None

        for shift in shifts:
            if shift.date != current_date:
                previous_shift.clear()
                current_date = shift.date

            shift_hours = get_shift_duration_hours(shift.start_time, shift.end_time)

            print(f"\nProcessing shift {shift.role.name} {shift.start_time}-{shift.end_time}")

            eligible_employees = [
                e
                for e in employees
                if e.role == shift.role
                and any(
                    a.day_of_week == shift.date.weekday()
                    and a.start_time <= shift.start_time
                    and a.end_time >= shift.end_time
                    for a in e.availabilities
                )
            ]

            eligible_employees.sort(key=lambda e: (hours_assigned.get(e.id, 0), e.name))

            print(f"Eligible employees: {[e.name for e in eligible_employees]}")

            assigned_count = 0

            for employee in eligible_employees:
                if assigned_count >= shift.min_staff_req:
                    break

                if employee.max_weekly_hours is not None:
                    if hours_assigned.get(employee.id,0) + shift_hours > employee.max_weekly_hours:
                        continue

                if employee.id in previous_shift:
                    prev_end = previous_shift[employee.id]
                    if shift.start_time < prev_end:
                        continue

                db.add(
                    ScheduleAssignment(
                        employee_id=employee.id,
                        shift_id=shift.id,
                        status="assigned",
                    )
                )

                scheduled_shift = ScheduledShift(
                    id=str(employee.id),
                    employeeName=employee.name,
                    startLabel=format_time_label(shift.start_time),
                    endLabel=format_time_label(shift.end_time),
                    color=get_employee_color(employee),
                )

                if shift.date not in days_by_date:
                    days_by_date[shift.date] = {}

                role_name = shift.role.name
                if role_name not in days_by_date[shift.date]:
                    days_by_date[shift.date][role_name] = []

                days_by_date[shift.date][role_name].append(scheduled_shift)

                previous_shift[employee.id] = shift.end_time
                hours_assigned[employee.id] = hours_assigned.get(employee.id, 0) + shift_hours
                assigned_count += 1

                print(f"Assigned {employee.name}")

        db.commit()
    except Exception:
        db.rollback()
        raise

    DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    days = [
        DaySchedule(
            date=d,
            dayLabel=DAYS[d.weekday()],
            groups=[
                RoleGroup(role=role_name, shifts=shift_list)
                for role_name, shift_list in roles.items()
            ]
        )
        for d, roles in sorted(days_by_date.items())
    ]

    return GenerateScheduleResponse(days=days)
