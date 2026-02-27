from gatorsched_api.db.base import Base
from gatorsched_api.db.session import engine


def init_db():
    from gatorsched_api.models.employee import Employee  # noqa: F401

    Base.metadata.create_all(bind=engine)
