from gatorsched_api.db.base import Base
from gatorsched_api.db.session import engine


def init_db():
    from gatorsched_api.models.availability import Availability # noqa: F401
    from gatorsched_api.models.employee import Employee  # noqa: F401
    from gatorsched_api.models.role import Role  # noqa: F401
    from gatorsched_api.models.schedule_assignment import ScheduleAssignment  # noqa: F401
    from gatorsched_api.models.shift import Shift  # noqa: F401
    from gatorsched_api.models.swap_request import SwapRequest  # noqa: F401

    Base.metadata.create_all(bind=engine)
