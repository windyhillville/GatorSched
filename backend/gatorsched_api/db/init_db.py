from gatorsched_api.db.base import Base
from gatorsched_api.db.session import engine


def init_db():
    from gatorsched_api.models.employee import Employee  # noqa: F401
    from gatorsched_api.models import role  # noqa: F401
    from gatorsched_api.models import shift  # noqa: F401
    from gatorsched_api.models import availability  # noqa: F401
    from gatorsched_api.models import schedule_assignment  # noqa: F401
    from gatorsched_api.models import swap_request  # noqa: F401


    Base.metadata.create_all(bind=engine)
