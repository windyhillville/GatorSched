from datetime import date, time

from gatorsched_api.models.availability import Availability
from gatorsched_api.models.employee import Employee, AccessLevel
from gatorsched_api.models.role import Role
from gatorsched_api.models.shift import Shift
from gatorsched_api.services.scheduler.greedy import generate_schedule_for_week


# Helper functions

def _create_role(db, name):
    role = Role(name=name, color="#000000", description=f"{name} role")
    db.add(role)
    db.commit()
    db.refresh(role)
    return role

def _create_employee(db, name, email, role_id, max_weekly_hours=None):
    employee = Employee(
        name=name,
        email=email,
        color="#000000",
        access_level=AccessLevel.employee,
        is_active=True,
        role_id=role_id,
        max_weekly_hours=max_weekly_hours,
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def _create_availability(db, employee_id, day_of_week, start, end):
    availability = Availability(
        employee_id=employee_id,
        day_of_week=day_of_week,
        start_time=start,
        end_time=end,
    )
    db.add(availability)
    db.commit()

def _create_shift(db, shift_date, start, end, role_id, min_staff=1):
    shift = Shift(
        date=shift_date,
        start_time=start,
        end_time=end,
        role_id=role_id,
        min_staff_req=min_staff,
    )
    db.add(shift)
    db.commit()
    db.refresh(shift)
    return shift

def test_scheduler_assigns_eligible_employee (db_session):
    # Employees with matching role and availability should be assigned
    role = _create_role(db_session, "TestRole1")
    employee = _create_employee(db_session, "Bob", "bob3@test.com", role.id)
    # Sunday, April 12th = weekday 6
    _create_availability(db_session, employee.id, 6, time(6, 0), time(14, 0))
    _create_shift(db_session, date(2026, 4, 12), time(6, 0), time(13, 0), role.id)

    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    assert len(result.days) == 1
    assert len(result.days[0].groups) == 1
    assert result.days[0].groups[0].shifts[0].employeeName == "Bob"

def test_scheduler_skips_wrong_role(db_session):
    # Employee should not be assigned to shifts for a different role
    role_a = _create_role(db_session, "RoleA")
    role_b = _create_role(db_session, "RoleB")
    employee = _create_employee(db_session, "Johnny", "john241@test.com", role_a.id)
    _create_availability(db_session, employee.id, 6, time(6, 0), time(14, 0))
    _create_shift(db_session, date(2026, 4, 12), time(6, 0), time(14, 0), role_b.id)

    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    assert len(result.days) == 0

def test_scheduler_skips_insufficient_availability(db_session):
    # Employees whose availability doesn't fully cover the shift should be skipped
    role = _create_role(db_session, "TestRole2")
    employee = _create_employee(db_session, "Charlie", "charlie123@test.com", role.id)
    # Available 9-12, but shift is 9-17
    _create_availability(db_session, employee.id, 6, time(9, 0), time(12, 0))
    _create_shift(db_session, date(2026, 4, 12), time(9, 0), time(17, 0), role.id)

    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    assert len(result.days) == 0

def test_scheduler_respects_max_weekly_hours(db_session):
    # Employees should not be scheduled beyond their max weekly hours
    role = _create_role(db_session, "TestRole3")
    # Craig capped at 15-hours, should only get one shift.
    craig = _create_employee(db_session, "Craig", "Craig234@test.com", role.id, max_weekly_hours=15)
    # Unlimited weekly hours employee
    ryan = _create_employee(db_session, "Ryan", "Ryan342@test.com", role.id)

    # Both available Sunday and Monday
    _create_availability(db_session, craig.id, 6, time(6, 0), time(22, 0))
    _create_availability(db_session, craig.id, 0, time(6, 0), time(22, 0))
    _create_availability(db_session, ryan.id, 6, time(6, 0), time(22, 0))
    _create_availability(db_session, ryan.id, 0, time(6, 0), time(22, 0))

    _create_shift(db_session, date(2026, 4, 12), time(9, 0), time(17, 0), role.id)
    _create_shift(db_session, date(2026, 4, 13), time(9, 0), time(17, 0), role.id)

    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    # Both shifts should be filled
    shifts = [
        s
        for day in result.days
        for group in day.groups
        for s in group.shifts
    ]
    assert len(shifts) == 2

    craig_shifts = [s for s in shifts if s.employeeName == "Craig"]
    assert len(craig_shifts) == 1

    ryan_shifts = [s for s in shifts if s.employeeName == "Ryan"]
    assert len(ryan_shifts) == 1

def test_scheduler_no_multiple_shifts_per_day(db_session):
    # An employee should not be assigned to more than one shift a day
    role = _create_role(db_session, "TestRole4")
    employee = _create_employee(db_session, "George", "george1245@test.com", role.id)
    _create_availability(db_session, employee.id, 6, time(6, 0), time(22, 0))

    # Two non-overlapping shifts on the same day
    _create_shift(db_session, date(2026, 4, 12), time(7, 0), time(12, 0), role.id)
    _create_shift(db_session, date(2026, 4, 12), time(14, 0), time(20, 0), role.id)

    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    shifts = [
        s
        for day in result.days
        for group in day.groups
        for s in group.shifts
        if s.employeeName == "George"
    ]
    assert len(shifts) == 1

def test_scheduler_delete_and_replace(db_session):
    # Running the scheduler after a schedule has already been made should replace old assignments, not duplicate them
    role = _create_role(db_session, "TestRole5")
    employee = _create_employee(db_session, "Lenny", "lenny342@test.com", role.id)
    _create_availability(db_session, employee.id, 6, time(6, 0), time(14, 0))
    _create_shift(db_session, date(2026, 4, 12), time(6, 0), time(13, 0), role.id)

    # Run scheduler twice
    generate_schedule_for_week(db_session, date(2026, 4,12))
    result = generate_schedule_for_week(db_session, date(2026, 4,12))

    shifts = sum(
        len(shift_list)
        for day in result.days
        for group in day.groups
        for shift_list in [group.shifts]
    )

    assert shifts == 1

def test_scheduler_empty_week(db_session):
    # A week with no shifts should return an empty response
    result = generate_schedule_for_week(db_session, date(2050, 1, 1))

    assert len(result.days) == 0

def test_scheduler_balances_hours_across_employees(db_session):
    # The scheduler should distribute shifts fairly based on hours assigned
    role = _create_role(db_session, "TestRole6")
    employee_a = _create_employee(db_session, "Hank", "hank43@test.com", role.id)
    employee_b = _create_employee(db_session, "Walter", "walter312@test.com", role.id)

    # Both available all day Sunday and Monday
    _create_availability(db_session, employee_a.id, 6, time(6, 0), time(22, 0))
    _create_availability(db_session, employee_b.id, 6, time(6, 0), time(22, 0))
    _create_availability(db_session, employee_a.id, 0, time(6, 0), time(22, 0))
    _create_availability(db_session, employee_b.id, 0, time(6, 0), time(22, 0))

    # One shift Sunday, and one on Monday
    _create_shift(db_session, date(2026, 4, 12), time(9, 0), time(17, 0), role.id)
    _create_shift(db_session, date(2026, 4, 13), time(9, 0), time(17, 0), role.id)

    result = generate_schedule_for_week(db_session, date(2026, 4, 12))

    names = [
        s.employeeName
        for day in result.days
        for group in day.groups
        for s in group.shifts
    ]

    assert "Hank" in names
    assert "Walter" in names