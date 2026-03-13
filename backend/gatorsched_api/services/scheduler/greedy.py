from datetime import date, time

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from gatorsched_api.models.employee import Employee

# from gatorsched_api.models.availability import Availability
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.scheduler import GenerateScheduleResponse, RoleGroup, ScheduledShift

# from gatorsched_api.models.role import Role


def format_time_label(t: time) -> str:
    if t.minute == 0:
        return t.strftime("%I %p").lstrip("0")
    return t.strftime("%I:%M %p").lstrip("0")


def generate_schedule_for_date(db: Session, target_date: date) -> GenerateScheduleResponse:
    print("SCHEDULER FUNCTION EXECUTED")
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
        .where(Shift.date == target_date)
        .options(joinedload(Shift.role))
        .order_by(Shift.start_time)
    )
    shifts = db.scalars(shift_stmt).unique().all()

    groups_by_role: dict[str, list[ScheduledShift]] = {}
    previous_shift: dict[int, time] = {}
    assignment_counts: dict[int, int] = {}

    for shift in shifts:
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

        eligible_employees.sort(key=lambda e: (assignment_counts.get(e.id, 0), e.name))

        print(f"Eligible employees: {[e.name for e in eligible_employees]}")

        assigned_count = 0

        for employee in eligible_employees:
            if assigned_count >= shift.min_staff_req:
                break

            if employee.id in previous_shift:
                prev_end = previous_shift[employee.id]
                if shift.start_time < prev_end:
                    continue

            scheduled_shift = ScheduledShift(
                id=str(employee.id),
                employeeName=employee.name,
                startLabel=format_time_label(shift.start_time),
                endLabel=format_time_label(shift.end_time),
                color="lightblue",
            )

            role_name = shift.role.name
            if role_name not in groups_by_role:
                groups_by_role[role_name] = []

            groups_by_role[role_name].append(scheduled_shift)

            previous_shift[employee.id] = shift.end_time
            assignment_counts[employee.id] = assignment_counts.get(employee.id, 0) + 1
            assigned_count += 1

            print(f"Assigned {employee.name}")

    groups = [
        RoleGroup(role=role_name, shifts=scheduled_shifts)
        for role_name, scheduled_shifts in groups_by_role.items()
    ]

    return GenerateScheduleResponse(groups=groups)
