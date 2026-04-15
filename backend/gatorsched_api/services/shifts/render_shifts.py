from collections import defaultdict
from datetime import date, time

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload, selectinload

from gatorsched_api.models.employee import Employee
from gatorsched_api.models.role import Role
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.schemas.manager.shifts.shifts import (
    AssignmentInfo,
    RoleInfo,
    ShiftItem,
    ShiftsGroup,
    ShiftsResponse,
    TimeRange,
)
from gatorsched_api.services.datetime_formatting import (
    day_index,
    format_time_label,
    format_week_label,
    get_day_key,
    get_long_day_label,
    get_short_day_label,
    get_sunday_week_bounds,
)


def get_shifts(week_start: date, db: Session) -> ShiftsResponse:
    start_week, end_week = get_sunday_week_bounds(week_start)

    shiftsStmt = (
        select(Shift)
        .where(Shift.date.between(start_week, end_week))
        .options(
            joinedload(Shift.role),
            selectinload(Shift.assignments).options(joinedload(ScheduleAssignment.employee)),
        )
        .order_by(Shift.date, Shift.start_time)
    )
    shifts = db.scalars(shiftsStmt).unique().all()

    employeesStmt = (
        select(Employee).where(Employee.is_active).options(selectinload(Employee.availabilities))
    )
    employees = db.scalars(employeesStmt).unique().all()

    rolesStmt = select(Role)
    roles = db.scalars(rolesStmt).all()

    avail_map: dict[int, list[tuple[Employee, time, time]]] = defaultdict(list)
    for emp in employees:
        for avail in emp.availabilities:
            avail_map[avail.day_of_week].append((emp, avail.start_time, avail.end_time))

    group_by_role: defaultdict[str, list[ShiftItem]] = defaultdict(list)
    for shift in shifts:
        assigned_ids = {a.employee_id for a in shift.assignments}

        day_idx = day_index(shift.date)
        available_employees = [
            emp
            for emp, start, end in avail_map[day_idx]
            if emp.role_id == shift.role_id
            and emp.id not in assigned_ids
            and start <= shift.start_time
            and end >= shift.end_time
        ]

        shift_item = ShiftItem(
            id=str(shift.id),
            role=RoleInfo(id=str(shift.role_id), name=shift.role.name, color=shift.role.color),
            fromTime=format_time_label(shift.start_time),
            toTime=format_time_label(shift.end_time),
            dayKey=get_day_key(shift.date),
            shortDayLabel=get_short_day_label(shift.date),
            longDayLabel=get_long_day_label(shift.date),
            startTime=TimeRange(
                hour=shift.start_time.strftime("%I"),
                minute=shift.start_time.strftime("%M"),
                period=shift.start_time.strftime("%p"),
            ),
            endTime=TimeRange(
                hour=shift.end_time.strftime("%I"),
                minute=shift.end_time.strftime("%M"),
                period=shift.end_time.strftime("%p"),
            ),
            staffingRequirement=shift.min_staff_req,
            assignedEmployees=[
                AssignmentInfo(
                    assignmentId=str(a.id),
                    employeeId=str(a.employee_id),
                    employeeName=a.employee.name,
                    avatarUrl=a.employee.avatar_url,
                    color=a.employee.color,
                )
                for a in shift.assignments
            ],
            availableEmployees=[
                AssignmentInfo(
                    assignmentId=None,
                    employeeId=str(employee.id),
                    employeeName=employee.name,
                    avatarUrl=employee.avatar_url,
                    color=employee.color,
                )
                for employee in available_employees
            ],
            underStaffedAmount=max(0, shift.min_staff_req - len(shift.assignments)),
        )

        group_by_role[shift.role.name].append(shift_item)

    groups = [
        ShiftsGroup(role=role, shifts=shift_item) for role, shift_item in group_by_role.items()
    ]

    roles_data = [
        RoleInfo(
            id=str(role.id),
            name=role.name,
            color=role.color,
        )
        for role in roles
    ]
    return ShiftsResponse(
        weekLabel=format_week_label(start_week, end_week), groups=groups, roles=roles_data
    )
