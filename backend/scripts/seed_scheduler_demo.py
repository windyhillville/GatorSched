from datetime import date, time

from gatorsched_api.db.init_db import init_db
from gatorsched_api.db.session import SessionLocal
from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import Employee
from gatorsched_api.models.role import Role
from gatorsched_api.models.schedule_assignment import ScheduleAssignment  # noqa: F401
from gatorsched_api.models.shift import Shift
from gatorsched_api.models.swap_request import SwapRequest  # noqa: F401


def seed():
    init_db()
    db = SessionLocal()

    print("Seeding scheduler demo data...")

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
    )
    dom = Employee(
        name="Dominick Consiglio",
        email="dom@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=25,
    )
    dan = Employee(
        name="Daniel Moody",
        email="dan@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=20,
    )
    ron = Employee(
        name="Ron Don",
        email="ron@example.com",
        role_id=cook_role.id,
        is_active=True,
        max_weekly_hours=35,
    )
    johnny = Employee(
        name="Johnny Johnson",
        email="johnny@example.com",
        role_id=cook_role.id,
        is_active=True,
        max_weekly_hours=30,
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
        ),  # Sunday
        Availability(
            employee_id=ben.id, day_of_week=0, start_time=time(9, 0), end_time=time(17, 0)
        ),  # Monday
        Availability(
            employee_id=ben.id, day_of_week=2, start_time=time(10, 0), end_time=time(18, 0)
        ),  # Wednesday
        # Dominick Consiglio (Server)
        Availability(
            employee_id=dom.id, day_of_week=6, start_time=time(10, 0), end_time=time(18, 0)
        ),  # Sunday
        Availability(
            employee_id=dom.id, day_of_week=1, start_time=time(11, 0), end_time=time(19, 0)
        ),  # Tuesday
        Availability(
            employee_id=dom.id, day_of_week=4, start_time=time(8, 0), end_time=time(16, 0)
        ),  # Friday
        # Daniel Moody (Server)
        Availability(
            employee_id=dan.id, day_of_week=6, start_time=time(12, 0), end_time=time(22, 0)
        ),  # Sunday
        Availability(
            employee_id=dan.id, day_of_week=3, start_time=time(8, 0), end_time=time(16, 0)
        ),  # Thursday
        Availability(
            employee_id=dan.id, day_of_week=5, start_time=time(14, 0), end_time=time(22, 0)
        ),  # Saturday
        # Ron Don (Cook)
        Availability(
            employee_id=ron.id, day_of_week=6, start_time=time(7, 0), end_time=time(15, 0)
        ),  # Sunday
        Availability(
            employee_id=ron.id, day_of_week=0, start_time=time(14, 0), end_time=time(22, 0)
        ),  # Monday
        Availability(
            employee_id=ron.id, day_of_week=2, start_time=time(6, 0), end_time=time(14, 0)
        ),  # Wednesday
        # Johnny Johnson (Cook)
        Availability(
            employee_id=johnny.id, day_of_week=6, start_time=time(14, 0), end_time=time(23, 0)
        ),  # Sunday
        Availability(
            employee_id=johnny.id, day_of_week=1, start_time=time(13, 0), end_time=time(21, 0)
        ),  # Tuesday
        Availability(
            employee_id=johnny.id, day_of_week=4, start_time=time(12, 0), end_time=time(20, 0)
        ),  # Friday
    ]

    db.add_all(availabilities)
    db.commit()

    # ---------- Shifts ----------
    shifts = [
        Shift(
            date=date(2026, 3, 15),  # Sunday
            start_time=time(6, 0),
            end_time=time(13, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),  # Sunday
            start_time=time(11, 0),
            end_time=time(17, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),  # Sunday
            start_time=time(13, 0),
            end_time=time(20, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),  # Sunday
            start_time=time(7, 0),
            end_time=time(14, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=date(2026, 3, 15),  # Sunday
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
    ]

    db.add_all(shifts)
    db.commit()

    print("Seed complete!")
    db.close()


if __name__ == "__main__":
    seed()
