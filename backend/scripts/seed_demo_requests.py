from sqlalchemy import select

from gatorsched_api.db.init_db import init_db
from gatorsched_api.db.session import SessionLocal
from gatorsched_api.models.employee import Employee
from gatorsched_api.models.schedule_assignment import ScheduleAssignment
from gatorsched_api.models.swap_request import SwapRequest
from gatorsched_api.models.types import EmployeeRequestStatus, ManagerRequestStatus


def seed_requests():
    init_db()
    db = SessionLocal()

    print("Seeding demo swap + callout requests...")

    stmt = (
        select(ScheduleAssignment)
        .join(ScheduleAssignment.employee)
        .order_by(Employee.name, ScheduleAssignment.id)
    )

    assignments = db.scalars(stmt).all()

    if not assignments:
        print("No schedule assignments found. Run scheduler first, then rerun this script.")
        db.close()
        return

    by_name: dict[str, list[ScheduleAssignment]] = {}
    for a in assignments:
        by_name.setdefault(a.employee.name, []).append(a)

    ben = by_name.get("Benjamin Davidson", [])
    dom = by_name.get("Dominick Consiglio", [])
    ron = by_name.get("Ron Don", [])
    johnny = by_name.get("Johnny Johnson", [])
    dan = by_name.get("Daniel Moody", [])

    # Swap Requests
    swap_requests = []

    # Ben wants Dom to cover one of his shifts -> waiting on Dom
    if ben and dom:
        swap_requests.append(
            SwapRequest(
                requester_id=ben[0].employee_id,
                cover_id=dom[0].employee_id,
                requester_assignment_id=ben[0].id,
                cover_assignment_id=dom[0].id,
                employee_status=EmployeeRequestStatus.pending,
                manager_status=ManagerRequestStatus.not_sent,
            )
        )

    # Johnny and Ron already agreed -> awaiting manager
    if johnny and ron and len(ron) > 1:
        swap_requests.append(
            SwapRequest(
                requester_id=johnny[0].employee_id,
                cover_id=ron[0].employee_id,
                requester_assignment_id=johnny[0].id,
                cover_assignment_id=ron[1].id,
                employee_status=EmployeeRequestStatus.accepted,
                manager_status=ManagerRequestStatus.pending,
            )
        )

    # Daniel and Ben already agreed -> awaiting manager
    if dan and ben:
        swap_requests.append(
            SwapRequest(
                requester_id=dan[0].employee_id,
                cover_id=ben[0].employee_id,
                requester_assignment_id=dan[0].id,
                cover_assignment_id=ben[0].id,
                employee_status=EmployeeRequestStatus.accepted,
                manager_status=ManagerRequestStatus.pending,
            )
        )

    if swap_requests:
        db.add_all(swap_requests)
        db.commit()
        print("Created swap request(s).")

    print("Demo requests seed complete!")

    db.close()


if __name__ == "__main__":
    seed_requests()
