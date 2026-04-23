from datetime import date, time, timedelta

from gatorsched_api.db.init_db import init_db
from gatorsched_api.db.session import SessionLocal
from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import Employee
from gatorsched_api.models.role import Role
from gatorsched_api.models.shift import Shift


def get_current_week_start() -> date:
    today = date.today()
    # Sunday = 0 in your app's week model
    days_since_sunday = (today.weekday() + 1) % 7
    return today - timedelta(days=days_since_sunday)


def seed():
    init_db()
    db = SessionLocal()

    current_week_start = get_current_week_start()

    print("Seeding scheduler + teams + requests demo data...")

    # ---------- Roles ----------
    server_role = Role(name="Server", color="#2BE0BC", description="Front of house server")
    cook_role = Role(name="Cook", color="#E02B55", description="Back of house cook")
    bartender_role = Role(name="Bartender", color="#F5A623", description="Behind the bar")
    dishwasher_role = Role(name="Dishwasher", color="#9013FE", description="Cleans dishes")
    host_role = Role(name="Host", color="#7ED321", description="Greet and seat guests")

    db.add_all([server_role, cook_role, bartender_role, dishwasher_role, host_role])
    db.commit()

    db.refresh(server_role)
    db.refresh(cook_role)
    db.refresh(bartender_role)
    db.refresh(dishwasher_role)
    db.refresh(host_role)

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
    marcus = Employee(
        name="Marcus Green",
        email="marcus@example.com",
        role_id=bartender_role.id,
        is_active=True,
        max_weekly_hours=35,
        color="lightcoral",
        avatar_url=None,
    )
    sarah = Employee(
        name="Sarah Paris",
        email="sarah@example.com",
        role_id=host_role.id,
        is_active=True,
        max_weekly_hours=30,
        color="lavender",
        avatar_url=None,
    )
    louis = Employee(
        name="Louis Smith",
        email="louis@example.com",
        role_id=dishwasher_role.id,
        is_active=True,
        max_weekly_hours=35,
        color="wheat",
        avatar_url=None,
    )
    emma = Employee(
        name="Emma Patel",
        email="emma@example.com",
        role_id=server_role.id,
        is_active=True,
        max_weekly_hours=15,
        color="lightyellow",
        avatar_url=None,
    )
    tyler = Employee(
        name="Tyler Brooks",
        email="tyler@example.com",
        role_id=cook_role.id,
        is_active=True,
        max_weekly_hours=20,
        color="gainsboro",
        avatar_url=None,
    )

    employees = [ben, dom, dan, ron, johnny, marcus, sarah, louis, emma, tyler]

    db.add_all(employees)
    db.commit()

    for e in employees:
        db.refresh(e)

    # ---------- Availabilities ----------
    # Sunday = 0 ... Saturday = 6
    availabilities = [
        # Benjamin Davidson (Server)
        Availability(
            employee_id=ben.id, day_of_week=0, start_time=time(6, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=1, start_time=time(9, 0), end_time=time(17, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=2, start_time=time(11, 0), end_time=time(19, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=4, start_time=time(8, 0), end_time=time(16, 0)
        ),
        Availability(
            employee_id=ben.id, day_of_week=6, start_time=time(14, 0), end_time=time(22, 0)
        ),
        # Dominick Consiglio (Server)
        Availability(
            employee_id=dom.id, day_of_week=0, start_time=time(6, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=dom.id, day_of_week=1, start_time=time(9, 0), end_time=time(17, 0)
        ),
        Availability(
            employee_id=dom.id, day_of_week=3, start_time=time(10, 0), end_time=time(18, 0)
        ),
        Availability(
            employee_id=dom.id, day_of_week=5, start_time=time(8, 0), end_time=time(16, 0)
        ),
        # Daniel Moody (Server)
        Availability(
            employee_id=dan.id, day_of_week=0, start_time=time(6, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=dan.id, day_of_week=4, start_time=time(8, 0), end_time=time(16, 0)
        ),
        Availability(
            employee_id=dan.id, day_of_week=5, start_time=time(8, 0), end_time=time(16, 0)
        ),
        Availability(
            employee_id=dan.id, day_of_week=6, start_time=time(14, 0), end_time=time(22, 0)
        ),
        # Ron Don (Cook)
        Availability(
            employee_id=ron.id, day_of_week=0, start_time=time(7, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=1, start_time=time(14, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=2, start_time=time(13, 0), end_time=time(21, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=3, start_time=time(6, 0), end_time=time(14, 0)
        ),
        Availability(
            employee_id=ron.id, day_of_week=5, start_time=time(12, 0), end_time=time(20, 0)
        ),
        # Johnny Johnson (Cook)
        Availability(
            employee_id=johnny.id, day_of_week=0, start_time=time(7, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=1, start_time=time(14, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=2, start_time=time(13, 0), end_time=time(21, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=3, start_time=time(6, 0), end_time=time(14, 0)
        ),
        Availability(
            employee_id=johnny.id, day_of_week=5, start_time=time(12, 0), end_time=time(20, 0)
        ),
        # Marcus (Bartender)
        Availability(
            employee_id=marcus.id, day_of_week=0, start_time=time(15, 0), end_time=time(23, 0)
        ),
        Availability(
            employee_id=marcus.id, day_of_week=2, start_time=time(15, 0), end_time=time(23, 0)
        ),
        Availability(
            employee_id=marcus.id, day_of_week=3, start_time=time(15, 0), end_time=time(23, 0)
        ),
        Availability(
            employee_id=marcus.id, day_of_week=5, start_time=time(15, 0), end_time=time(23, 0)
        ),
        Availability(
            employee_id=marcus.id, day_of_week=6, start_time=time(15, 0), end_time=time(23, 0)
        ),
        # Sarah (Host)
        Availability(
            employee_id=sarah.id, day_of_week=1, start_time=time(10, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=sarah.id, day_of_week=2, start_time=time(10, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=sarah.id, day_of_week=3, start_time=time(10, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=sarah.id, day_of_week=4, start_time=time(10, 0), end_time=time(20, 0)
        ),
        Availability(
            employee_id=sarah.id, day_of_week=6, start_time=time(10, 0), end_time=time(20, 0)
        ),
        # Louis (Dishwasher)
        Availability(
            employee_id=louis.id, day_of_week=0, start_time=time(6, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=louis.id, day_of_week=1, start_time=time(6, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=louis.id, day_of_week=2, start_time=time(6, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=louis.id, day_of_week=3, start_time=time(6, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=louis.id, day_of_week=4, start_time=time(6, 0), end_time=time(22, 0)
        ),
        # Emma (Server) Strict
        Availability(
            employee_id=emma.id, day_of_week=4, start_time=time(17, 0), end_time=time(22, 0)
        ),
        Availability(
            employee_id=emma.id, day_of_week=5, start_time=time(17, 0), end_time=time(22, 0)
        ),
        # Tyler (Cook) Strict
        Availability(
            employee_id=tyler.id, day_of_week=0, start_time=time(12, 0), end_time=time(18, 0)
        ),
        Availability(
            employee_id=tyler.id, day_of_week=6, start_time=time(12, 0), end_time=time(18, 0)
        ),
    ]

    db.add_all(availabilities)
    db.commit()

    # ---------- Shifts for target week ----------
    # Week is anchored to the current Sunday's date
    sun = current_week_start
    mon = sun + timedelta(days=1)
    tue = sun + timedelta(days=2)
    wed = sun + timedelta(days=3)
    thu = sun + timedelta(days=4)
    fri = sun + timedelta(days=5)
    sat = sun + timedelta(days=6)

    shifts = [
        # Sunday
        Shift(
            date=sun,
            start_time=time(6, 0),
            end_time=time(13, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(11, 0),
            end_time=time(17, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(13, 0),
            end_time=time(20, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(7, 0),
            end_time=time(14, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(16, 0),
            end_time=time(22, 0),
            role_id=bartender_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=sun,
            start_time=time(10, 0),
            end_time=time(18, 0),
            role_id=dishwasher_role.id,
            min_staff_req=1,
        ),
        # Monday
        Shift(
            date=mon,
            start_time=time(9, 0),
            end_time=time(17, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=mon,
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=mon,
            start_time=time(11, 0),
            end_time=time(19, 0),
            role_id=host_role.id,
            min_staff_req=1,
        ),
        # Tuesday
        Shift(
            date=tue,
            start_time=time(11, 0),
            end_time=time(19, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=tue,
            start_time=time(13, 0),
            end_time=time(21, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=tue,
            start_time=time(14, 0),
            end_time=time(22, 0),
            role_id=dishwasher_role.id,
            min_staff_req=1,
        ),
        # Wednesday
        Shift(
            date=wed,
            start_time=time(10, 0),
            end_time=time(18, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=wed,
            start_time=time(6, 0),
            end_time=time(14, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=wed,
            start_time=time(11, 0),
            end_time=time(19, 0),
            role_id=host_role.id,
            min_staff_req=1,
        ),
        # Thursday
        Shift(
            date=thu,
            start_time=time(8, 0),
            end_time=time(16, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=thu,
            start_time=time(10, 0),
            end_time=time(18, 0),
            role_id=dishwasher_role.id,
            min_staff_req=1,
        ),
        # Friday
        Shift(
            date=fri,
            start_time=time(8, 0),
            end_time=time(16, 0),
            role_id=server_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=fri,
            start_time=time(12, 0),
            end_time=time(20, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        Shift(
            date=fri,
            start_time=time(12, 0),
            end_time=time(20, 0),
            role_id=cook_role.id,
            min_staff_req=1,
        ),
        # Saturday
        Shift(
            date=sat,
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
    # assignments = [
    #     ScheduleAssignment(employee_id=ben.id, shift_id=shifts[0].id),  # 0: Ben - Sun server
    #     ScheduleAssignment(employee_id=dom.id, shift_id=shifts[1].id),  # 1: Dom - Sun server
    #     ScheduleAssignment(employee_id=dan.id, shift_id=shifts[2].id),  # 2: Dan - Sun server
    #     ScheduleAssignment(employee_id=ron.id, shift_id=shifts[3].id),  # 3: Ron - Sun cook
    #     ScheduleAssignment(employee_id=ron.id, shift_id=shifts[4].id),  # 4: Ron - Sun cook
    #     ScheduleAssignment(employee_id=ben.id, shift_id=shifts[5].id),  # 5: Ben - Mon server
    #     ScheduleAssignment(employee_id=ron.id, shift_id=shifts[6].id),  # 6: Ron - Mon cook
    #     ScheduleAssignment(employee_id=dom.id, shift_id=shifts[7].id),  # 7: Dom - Tue server
    #     ScheduleAssignment(employee_id=johnny.id, shift_id=shifts[8].id),  # 8: Johnny - Tue cook
    #     ScheduleAssignment(employee_id=ben.id, shift_id=shifts[9].id),  # 9: Ben - Wed server
    #     ScheduleAssignment(employee_id=ron.id, shift_id=shifts[10].id),  # 10: Ron - Wed cook
    #     ScheduleAssignment(employee_id=dan.id, shift_id=shifts[11].id),  # 11: Dan - Thu server
    #     ScheduleAssignment(employee_id=dom.id, shift_id=shifts[12].id),  # 12: Dom - Fri server
    #     ScheduleAssignment(employee_id=johnny.id, shift_id=shifts[13].id),  # 13: Johnny - Fri cook
    #     ScheduleAssignment(employee_id=dan.id, shift_id=shifts[14].id),  # 14: Dan - Sat server
    # ]

    # db.add_all(assignments)
    # db.commit()

    # for assignment in assignments:
    #     db.refresh(assignment)

    # # ---------- Swap Requests ----------
    # swap_requests = [
    #     # EMPLOYEE QUEUE EXAMPLES
    #     # Ben requests a swap with Dom -> still waiting on Dom
    #     SwapRequest(
    #         requester_id=ben.id,
    #         cover_id=dom.id,
    #         requester_assignment_id=assignments[5].id,  # Ben - Mon server
    #         cover_assignment_id=assignments[7].id,  # Dom - Tue server
    #         employee_status=EmployeeRequestStatus.pending,
    #         manager_status=ManagerRequestStatus.not_sent,
    #     ),
    #     # Dan requests a swap with Ben -> still waiting on Ben
    #     SwapRequest(
    #         requester_id=dan.id,
    #         cover_id=ben.id,
    #         requester_assignment_id=assignments[11].id,  # Dan - Thu server
    #         cover_assignment_id=assignments[9].id,  # Ben - Wed server
    #         employee_status=EmployeeRequestStatus.pending,
    #         manager_status=ManagerRequestStatus.not_sent,
    #     ),
    #     # MANAGER QUEUE EXAMPLES
    #     # Johnny and Ron already agreed -> waiting on manager
    #     SwapRequest(
    #         requester_id=johnny.id,
    #         cover_id=ron.id,
    #         requester_assignment_id=assignments[13].id,  # Johnny - Fri cook
    #         cover_assignment_id=assignments[10].id,  # Ron - Wed cook
    #         employee_status=EmployeeRequestStatus.accepted,
    #         manager_status=ManagerRequestStatus.pending,
    #     ),
    #     # Dom and Dan already agreed -> waiting on manager
    #     SwapRequest(
    #         requester_id=dom.id,
    #         cover_id=dan.id,
    #         requester_assignment_id=assignments[12].id,  # Dom - Fri server
    #         cover_assignment_id=assignments[14].id,  # Dan - Sat server
    #         employee_status=EmployeeRequestStatus.accepted,
    #         manager_status=ManagerRequestStatus.pending,
    #     ),
    #     # Ben and Dom already agreed -> waiting on manager
    #     SwapRequest(
    #         requester_id=ben.id,
    #         cover_id=dom.id,
    #         requester_assignment_id=assignments[0].id,  # Ben - Sun server
    #         cover_assignment_id=assignments[1].id,  # Dom - Sun server
    #         employee_status=EmployeeRequestStatus.accepted,
    #         manager_status=ManagerRequestStatus.pending,
    #     ),
    # ]

    # db.add_all(swap_requests)
    # db.commit()

    print("Seed complete!")
    db.close()


if __name__ == "__main__":
    seed()
