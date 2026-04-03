from datetime import date, time

from gatorsched_api.db.init_db import init_db
from gatorsched_api.db.session import SessionLocal
from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import Employee
from gatorsched_api.models.role import Role
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.shift import Shift
from gatorsched_api.models.swap_request import SwapRequest  # noqa: F401


def seed():
    init_db()
    db = SessionLocal()

    print("Seeding scheduler + teams demo data...")

    # ---------- Roles ----------
    server_role = Role(name="Server", description="Front of house server")
    cook_role = Role(name="Cook", description="Back of house cook")

    db.add_all([server_role, cook_role])
    db.commit()

    db.refresh(server_role)
    db.refresh(cook_role)

    # ---------- Employees ----------
    ben = Employee(
        name="Benjamin Davidson",
        email="ben@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=30,
        color="lightblue",
        avatar_url=None,
    )
    dom = Employee(
        name="Dominick Consiglio",
        email="dom@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=25,
        color="lightgreen",
        avatar_url=None,
    )
    dan = Employee(
        name="Daniel Moody",
        email="dan@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=20,
        color="skyblue",
        avatar_url=None,
    )
    ron = Employee(
        name="Ron Don",
        email="ron@example.com",
        role_id=cook_role.id,
        is_active=True,
        max_weekly_hours=35,
        color="lightpink",
        avatar_url=None,
    )
    johnny = Employee(
        name="Johnny Johnson",
        email="johnny@example.com",
        role_id=cook_role.id,
        is_active=True,
        max_weekly_hours=30,
        color="peachpuff",
        avatar_url=None,
    )

    employees = [ben, dom, dan, ron, johnny]

    db.add_all(employees)
    db.commit()

    for e in employees:
        db.refresh(e)

    # ---------- Availabilities ----------
    # Monday = 0 ... Sunday = 6
    availabilities = [
        # Benjamin Davidson (Server)
        Availability(
            employee_id=ben.id, day_of_week=6, start_time=time(6, 0), end_time=time(14, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=0, start_time=time(9, 0), end_time=time(17, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=2, start_time=time(10, 0), end_time=time(18, 0)
        ),
        # Dominick Consiglio (Server)
        Availability(
            employee_id=dom.id, day_of_week=6, start_time=time(10, 0), end_time=time(18, 0)
        ),
        Availability(
            employee_id=dom.id, day_of_week=1, start_time=time(11, 0), end_time=time(19, 0)
        ),
        Availability(
            employee_id=dom.id, day_of_week=4, start_time=time(8, 0), end_time=time(16, 0)
        ),
        # Daniel Moody (Server)
        Availability(
            employee_id=dan.id, day_of_week=6, start_time=time(12, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=dan.id, day_of_week=3, start_time=time(8, 0), end_time=time(16, 0)
        ),
        Availability(
            employee_id=dan.id, day_of_week=5, start_time=time(14, 0), end_time=time(22, 0)
        ),
        # Ron Don (Cook)
        Availability(
            employee_id=ron.id, day_of_week=6, start_time=time(7, 0), end_time=time(15, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=0, start_time=time(14, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=2, start_time=time(6, 0), end_time=time(14, 0)
        ),
        # Johnny Johnson (Cook)
        Availability(
            employee_id=johnny.id, day_of_week=6, start_time=time(14, 0), end_time=time(23, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=1, start_time=time(13, 0), end_time=time(21, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=4, start_time=time(12, 0), end_time=time(20, 0)
        ),
    ]

    db.add_all(availabilities)
    db.commit()

    # ---------- Shifts for target week ----------
    # Week anchored around 2026-03-15 (Sunday)
    shifts = [
        # Sunday 2026-03-15
        Shift(
            date=date(2026, 3, 15),
            start_time=time(6, 0),
            end_time=time(13, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),
            start_time=time(11, 0),
            end_time=time(17, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),
            start_time=time(13, 0),
            end_time=time(20, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),
            start_time=time(7, 0),
            end_time=time(14, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Monday 2026-03-16
        Shift(
            date=date(2026, 3, 16),
            start_time=time(9, 0),
            end_time=time(17, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 16),
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Tuesday 2026-03-17
        Shift(
            date=date(2026, 3, 17),
            start_time=time(11, 0),
            end_time=time(19, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 17),
            start_time=time(13, 0),
            end_time=time(21, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Wednesday 2026-03-18
        Shift(
            date=date(2026, 3, 18),
            start_time=time(10, 0),
            end_time=time(18, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 18),
            start_time=time(6, 0),
            end_time=time(14, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Thursday 2026-03-19
        Shift(
            date=date(2026, 3, 19),
            start_time=time(8, 0),
            end_time=time(16, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        # Friday 2026-03-20
        Shift(
            date=date(2026, 3, 20),
            start_time=time(8, 0),
            end_time=time(16, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 20),
            start_time=time(12, 0),
            end_time=time(20, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Saturday 2026-03-21
        Shift(
            date=date(2026, 3, 21),
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
    ]

    db.add_all(shifts)
    db.commit()

    for s in shifts:
        db.refresh(s)

    # ---------- Schedule Assignments ----------
    # Intentionally leave Johnny with no assignments this week
    assignments = [
        ScheduleAssignment(employee_id=ben.id, shift_id=shifts[0].id),  # Sun server
        ScheduleAssignment(employee_id=dom.id, shift_id=shifts[1].id),  # Sun server
        ScheduleAssignment(employee_id=dan.id, shift_id=shifts[2].id),  # Sun server
        ScheduleAssignment(employee_id=ron.id, shift_id=shifts[3].id),  # Sun cook
        ScheduleAssignment(employee_id=ron.id, shift_id=shifts[4].id),  # Sun cook
        ScheduleAssignment(employee_id=ben.id, shift_id=shifts[5].id),  # Mon server
        ScheduleAssignment(employee_id=ron.id, shift_id=shifts[6].id),  # Mon cook
        ScheduleAssignment(employee_id=dom.id, shift_id=shifts[7].id),  # Tue server
        ScheduleAssignment(employee_id=johnny.id, shift_id=shifts[8].id),  # Tue cook
        ScheduleAssignment(employee_id=ben.id, shift_id=shifts[9].id),  # Wed server
        ScheduleAssignment(employee_id=ron.id, shift_id=shifts[10].id),  # Wed cook
        ScheduleAssignment(employee_id=dan.id, shift_id=shifts[11].id),  # Thu server
        ScheduleAssignment(employee_id=dom.id, shift_id=shifts[12].id),  # Fri server
        ScheduleAssignment(employee_id=johnny.id, shift_id=shifts[13].id),  # Fri cook
        ScheduleAssignment(employee_id=dan.id, shift_id=shifts[14].id),  # Sat server
    ]

    db.add_all(assignments)
    db.commit()

    print("Seed complete!")
    db.close()


if __name__ == "__main__":
    seed()
